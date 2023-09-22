'use client'

import axios from 'axios'
import { createContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface EditorContextProps {
  mdValue: string
  setMdValue: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
  thumbUrl: string
  setThumbUrl: React.Dispatch<React.SetStateAction<string>>
  handlePost: () => Promise<string | undefined>
}

export const EditorContext = createContext({} as EditorContextProps)

export default function EditorProvider({ children }: { children: React.ReactNode }) {
  const [mdValue, setMdValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [thumbUrl, setThumbUrl] = useState<string>('')

  const router = useRouter()

  const handlePost = async () => {
    try {
      if (!mdValue) return toast.error('Please enter content!')
      if (!title) return toast.error('Please enter title!')
      if (!desc) return toast.error('Please enter description!')
      if (!thumbUrl) return toast.error('Please upload thumbnail!')
      const { data: newPost } = await axios.post('/api/post', {
        title,
        rawContent: mdValue,
        desc,
        thumbnail: thumbUrl,
      })
      router.push(`/post/${newPost.id}`)
      toast.success('Posted article!')
    } catch (error) {
      toast.error('Error posting article!')
    }
  }

  return (
    <EditorContext.Provider
      value={{
        mdValue,
        setMdValue,
        title,
        setTitle,
        desc,
        setDesc,
        thumbUrl,
        setThumbUrl,
        handlePost,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
