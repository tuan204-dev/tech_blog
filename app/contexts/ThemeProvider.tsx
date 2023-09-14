'use client'

import { ThemeProvider as Provider } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return children

  return (
    <Provider enableSystem={true} attribute="class">
      {children}
    </Provider>
  )
}
