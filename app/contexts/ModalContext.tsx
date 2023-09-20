'use client'

import { createContext, use, useState } from 'react'
import PreviewModal from '../components/Modal/PreviewModal'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface ModalProps {
  children: React.ReactNode
}

interface ModalContextProps {
  setPrevOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMdValue: React.Dispatch<React.SetStateAction<string>>
  setPreviewTitle: React.Dispatch<React.SetStateAction<string>>
}

export const ModalContext = createContext({} as ModalContextProps)

const ModalProvider: React.FC<ModalProps> = ({ children }) => {
  const [isPrevOpen, setPrevOpen] = useState<boolean>(false)
  const [mdValue, setMdValue] = useState<string>('')
  const [previewTitle, setPreviewTitle] = useState<string>('')

  return (
    <ModalContext.Provider value={{ setPrevOpen, setMdValue, setPreviewTitle }}>
      {isPrevOpen && (
        <PreviewModal
          previewTitle={previewTitle}
          mdValue={mdValue}
          setPrevOpen={setPrevOpen}
        />
      )}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
