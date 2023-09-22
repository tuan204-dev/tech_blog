'use client'

import Editor from '@/components/Editor/Editor'
import { EditorContext } from '@/contexts/EditorContext'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'

const Admin: React.FC = () => {
  const { mdValue, setMdValue, desc, setDesc, title, setTitle, thumbUrl, setThumbUrl } =
    useContext(EditorContext)

  const { data: session } = useSession()

  // if (!session) return redirect('/')

  useEffect(() => {
    console.log(session)
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
