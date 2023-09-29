'use client'
import { useTheme } from 'next-themes'
import { SwapSpinner } from 'react-spinners-kit'

const Loading = () => {
  const { systemTheme } = useTheme()

  return (
    <div className="h-screen w-full flex justify-center items-center bg-white dark:bg-dark-base">
      <SwapSpinner size={65} color={systemTheme === 'dark' ? '#333' : '#ccc'} />
    </div>
  )
}

export default Loading
