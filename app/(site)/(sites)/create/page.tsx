'use client'

import Editor from '@/components/Editor/Editor'
import Footer from '@/components/Footer'
import { EditorContext } from '@/contexts/EditorContext'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

const CreatePage: React.FC = () => {
  const {
    mdValue,
    setMdValue,
    desc,
    setDesc,
    title,
    setTitle,
    setThumbUrl,
    clearContent,
  } = useContext(EditorContext)
  const router = useRouter()

  const { currentUser, isLoading } = useCurrentUser()

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.push('/login')
      } else {
        clearContent()
      }
    }
  }, [isLoading, currentUser])

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-70px)] min-w-[450px]">
        <Editor
          value={mdValue}
          setValue={setMdValue}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          setThumbUrl={setThumbUrl}
        />
      </div>
      <Footer />
    </>
  )
}

export default CreatePage
