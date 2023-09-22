'use client'

import { createContext, useState } from 'react'
import PreviewModal from '../components/Modal/PreviewModal'

interface ModalProps {
  children: React.ReactNode
}

interface ModalContextProps {
  setPrevOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext({} as ModalContextProps)

const ModalProvider: React.FC<ModalProps> = ({ children }) => {
  const [isPrevOpen, setPrevOpen] = useState<boolean>(false)

  return (
    <ModalContext.Provider value={{ setPrevOpen }}>
      {isPrevOpen && <PreviewModal />}
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
