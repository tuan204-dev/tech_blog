'use client'

import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import Editor from '@/components/Editor/Editor'
import { EditorContext } from '@/contexts/EditorContext'
import useCurrentUser from '@/hooks/useCurrentUser'
import { getPostById } from '@/libs/actions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

const EditPost = ({ params }: { params: { id: string } }) => {
  const { setTitle, setThumbUrl, setDesc, setMdValue, title, desc, mdValue } =
    useContext(EditorContext)
  // const [post, setPost] = useState<any>(null)
  const { currentUser, isLoading } = useCurrentUser()

  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading && post && post?.userId !== currentUser?.id) {
  //     router.push('/')
  //   }
  // }, [isLoading, post, currentUser])

  useEffect(() => {
    ;(async () => {
      if (!isLoading && currentUser) {
        const post = await getPostById({ postId: params.id })
        if (currentUser?.id !== post?.userId) {
          return router.push('/')
        }
        setTitle(post!.title)
        setDesc(post!.desc || '')
        setThumbUrl(post!.thumbnail)
        setMdValue(post!.rawContent)
      }
    })()
  }, [
    params.id,
    setTitle,
    setThumbUrl,
    setDesc,
    setMdValue,
    router,
    currentUser,
    isLoading,
  ])

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
