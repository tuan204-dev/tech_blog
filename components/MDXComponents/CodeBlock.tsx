'use client'

import { useRef, useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { RxCopy } from 'react-icons/rx'

const CodeBlock = (props: any) => {
  const textInput = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }

  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput?.current?.textContent || '')
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-3 top-3 w-7 h-7 p-1 rounded bg-[#31383e] text-[#a19a92] transition flex items-center justify-center`}
          onClick={onCopy}
        >
          {copied ? <BsCheckLg /> : <RxCopy />}
        </button>
      )}

      {/* <pre>{props.children}</pre> */}
      <pre {...props}></pre>
    </div>
  )
}

export default CodeBlock
