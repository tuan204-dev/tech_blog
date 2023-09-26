'use client'

import { EditorContext } from '@/contexts/EditorContext'
import { ModalContext } from '@/contexts/ModalContext'
import getSerialize from '@/utils/getSerialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import MDXRender from '../MDXRender'
import './Modal.scss'

const PreviewModal: React.FC = () => {
  const { mdValue, title } = useContext(EditorContext)
  const { setPrevOpen } = useContext(ModalContext)
  const [previewValue, setPreviewValue] =
    useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>>()

  useEffect(() => {
    ;(async () => {
      if (!mdValue) return
      const mdxValue = await getSerialize({ mdValue })
      setPreviewValue(mdxValue)
    })()
  }, [mdValue])

  return (
    <div
      onClick={() => setPrevOpen(false)}
      className="fixed top-0 right-0 left-0 h-[max(100vh,600px)] z-[999999] bg-gray-500/20 px-16 lg:px-8 md:px-6  py-10 overflow-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-dark-base w-full h-full rounded-3xl relative py-6 overflow-hidden modal-body"
      >
        <button
          onClick={() => setPrevOpen(false)}
          className="absolute z-40 top-4 right-4 p-[6px] hover:bg-slate-200 rounded-full transition"
        >
          <span className="text-4xl text-slate-700">
            <IoMdClose />
          </span>
        </button>
        <div className="overflow-hidden overflow-y-scroll scrollbar-hide h-full">
          <div className="pt-10">
            <div className="flex flex-col justify-center">
              <h1 className="text-[44px] font-bold px-24 lg:px-16 md:px-8 mb-6 text-slate-800 dark:text-white text-center">
                {title || 'Article Preview'}
              </h1>
              <div className="h-[2px] w-[calc(100%-120px)] bg-slate-300 mx-auto mb-5"></div>
              {mdValue && previewValue && <MDXRender source={previewValue!} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
