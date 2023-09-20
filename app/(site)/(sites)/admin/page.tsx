'use client'

import Editor from '@/app/components/Editor/Editor'
import MDXRender from '@/app/components/MDXRender'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'

const Admin = () => {
  const [mdValue, setMdValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [previewValue, serPreviewValue] =
    useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>>()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ;(async () => {
        const previewValue = await serialize(mdValue.replace(/\\n/g, '\\'), {
          mdxOptions: {
            development: true,
          },
        })
        // console.log(source)
        serPreviewValue(previewValue)
      })()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [mdValue])

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] min-w-[450px]">
      <Editor
        value={mdValue}
        setValue={setMdValue}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
      />
    </div>
  )
}

async function getSerialize(data: string) {
  const source = data
  const mdxSource = await serialize(source)

  console.log(mdxSource)
  return { props: { source: mdxSource } }
}

export default Admin
