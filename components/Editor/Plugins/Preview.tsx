import { ModalContext } from '@/contexts/ModalContext'
import { useContext } from 'react'
import { HiEye } from 'react-icons/hi'

const Preview = () => {
  const { setPrevOpen } = useContext(ModalContext)

  return (
    <span
      className="flex items-center px-1 cursor-pointer text-xl hover:text-[#212121]"
      title="Preview"
      onClick={() => setPrevOpen(true)}
    >
      <HiEye />
    </span>
  )
}

Preview.align = 'right'
Preview.pluginName = 'Preview'

export default Preview
