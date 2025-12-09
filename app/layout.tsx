import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import StyledComponentsRegistry from '../contexts/AntdRegistry'
import Provider from '../contexts/AuthContext'
import ModalProvider from '../contexts/ModalContext'
import ThemeProvider from '../contexts/ThemeProvider'
import './globals.css'
import Loading from './loading'
import '@/css/draculaTheme.css'
import EditorProvider from '../contexts/EditorContext'
import SearchModal from '@/components/Modal/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Blog',
  description: 'A blog about technology, programming, and software development.',
  icons: '/blog.png',
  verification: {
    google: '8AZk5JBCdv_v9qYuoNM9zp6GhL52I_4wdJxKxUUPO9M',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar-hide relative`}>
        <Suspense fallback={<Loading />}>
          <StyledComponentsRegistry>
            <EditorProvider>
              <ThemeProvider>
                <ModalProvider>
                  <Provider>
                    <Toaster
                      toastOptions={{
                        className: 'dark:bg-gray-800 dark:text-white',
                      }}
                    />
                    {children}
                    <SearchModal />
                  </Provider>
                </ModalProvider>
              </ThemeProvider>
            </EditorProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  )
}
