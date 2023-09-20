'use client'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import MDXRender from '../MDXRender'
import { IoMdClose } from 'react-icons/io'
import rehypeHighlight from 'rehype-highlight'

interface PreviewModalProps {
  mdValue: string
  previewTitle: string
  setPrevOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  mdValue,
  setPrevOpen,
  previewTitle,
}) => {
  const [previewValue, setPreviewValue] =
    useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>>()

  useEffect(() => {
    ;(async () => {
      const mdxSource = await serialize(mdValue.replace(/\\n/g, '\\'), {
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
          development: true,
        },
      })
      setPreviewValue(mdxSource)
    })()
  }, [mdValue])

  return (
    <div className="fixed top-0 right-0 left-0 h-[max(100vh,1000px)] z-[999999] bg-gray-500/20 px-4 sm:px-6 md:px-8 lg:px-16 py-10 overflow-hidden">
      <div className="bg-white w-full h-full rounded-3xl relative py-6 overflow-hidden">
        <button
          onClick={() => setPrevOpen(false)}
          className="absolute z-40 top-4 right-4 p-[6px] hover:bg-slate-200 rounded-full transition"
        >
          <span className="text-4xl text-slate-700">
            <IoMdClose />
          </span>
        </button>
        <div className='overflow-hidden overflow-y-scroll scrollbar-hide h-full'>
          <div className="pt-14">
            <div className="flex flex-col justify-center">
              <h1 className='text-[44px] font-bold px-24 mb-6 text-slate-800 text-center'>{previewTitle || 'Article Preview'}</h1>
              <div className='h-[2px] w-[calc(100%-120px)] bg-slate-300 mx-auto mb-5'></div>
              {mdValue && previewValue && <MDXRender source={previewValue!} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewModal
