'use client'

import Editor from '@/components/Editor/Editor'
import { EditorContext } from '@/contexts/EditorContext'
import { getPostById } from '@/libs/actions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const EditPost = ({ params }: { params: { id: string } }) => {
  const { setTitle, setThumbUrl, setDesc, setMdValue, title, desc, mdValue, thumbUrl } =
    useContext(EditorContext)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const post = await getPostById({ postId: params.id })
      setTitle(post.title)
      setDesc(post.desc)
      setThumbUrl(post.thumbnail)
      setMdValue(post.rawContent)
    })()
  }, [params.id, setTitle, setThumbUrl, setDesc, setMdValue])

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] min-w-[450px]">
      <Editor
        title={title}
        desc={desc}
        value={mdValue}
        setThumbUrl={setThumbUrl}
        setTitle={setTitle}
        setDesc={setDesc}
        setValue={setMdValue}
      />
    </div>
  )
}

export default EditPost
