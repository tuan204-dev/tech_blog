'use client'

import Editor from '@/components/Editor/Editor'
import { EditorContext } from '@/contexts/EditorContext'
import { useContext, useEffect } from 'react'

const Admin: React.FC = () => {
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

  useEffect(() => {
    clearContent()
  }, [])

  return (
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
  )
}

export default Admin
