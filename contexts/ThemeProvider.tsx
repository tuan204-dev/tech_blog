'use client'

import { ThemeProvider as Provider, useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return children

  return (
    <Provider defaultTheme='light' attribute={'class'}>
      {children}
    </Provider>
  )
}
