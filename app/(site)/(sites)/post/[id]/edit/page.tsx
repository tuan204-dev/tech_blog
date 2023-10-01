'use client'

import Editor from '@/components/Editor/Editor'
import Footer from '@/components/Footer'
import { EditorContext } from '@/contexts/EditorContext'
import useCurrentUser from '@/hooks/useCurrentUser'
import { getPostByIdOnClientSide } from '@/libs/actions'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const EditPost = ({ params }: { params: { id: string } }) => {
  const { setTitle, setThumbUrl, setDesc, setMdValue, title, desc, mdValue } =
    useContext(EditorContext)
  const { currentUser, isLoading } = useCurrentUser()

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      if (!isLoading && currentUser) {
        const post = await getPostByIdOnClientSide({ postId: params.id })
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
    <>
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
      <Footer />
    </>
  )
}

export default EditPost
