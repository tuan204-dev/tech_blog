'use client'

import { useTheme } from 'next-themes'
import { StageSpinner } from 'react-spinners-kit'

interface LoadingProps {
  size: number
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  const { systemTheme } = useTheme()

  return (
    <StageSpinner
      className={`text-[${systemTheme === 'dark' ? '#333' : '#ccc'}]`}
      size={size}
      color={systemTheme === 'dark' ? '#333' : '#ccc'}
    />
  )
}

export default Loading
