'use client'

import useSearchArticle from '@/hooks/useSearchArticle'
import useSearchModal from '@/hooks/useSearchModal'
import { Popover } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { EditorContext } from '../contexts/EditorContext'
import Avatar from './Avatar'
import Headless from './Headless'

const Header = () => {
  const { theme, systemTheme, setTheme } = useTheme()
  const [isDarkMode, setDarkMode] = useState<boolean>(
    theme === 'dark' || systemTheme === 'dark'
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchQueryDebounce, setSearchQueryDebounce] = useState<string>('')
  // const [searchResults, setSearchResults] = useState<PostInclUser[]>([])

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
  const [isSearchResultsVisible, setSearchResultsVisible] = useState<boolean>(false)

  const { handlePost, handleUpdatePost } = useContext(EditorContext)

  const { data: searchResults, isLoading } = useSearchArticle(searchQueryDebounce)

  const pathname = usePathname()
  const editPostRegex = new RegExp('^/post/[^/]+/edit$')
  const searchModal = useSearchModal()

  const { data: session } = useSession()

  const toggleTheme = useCallback(
    (e: any) => {
      e.preventDefault()
      setTheme(isDarkMode ? 'light' : 'dark')
      setDarkMode((prev) => !prev)
    },
    [isDarkMode, setTheme]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQueryDebounce(searchQuery)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  useEffect(() => {
    if (isInputFocused) {
      setSearchResultsVisible(true)
    } else {
      setTimeout(() => {
        setSearchResultsVisible(false)
      }, 200)
    }
  }, [isInputFocused])

  const popoverContent = (
    <div>
      <button
        onClick={() => signOut()}
        className="h-full font-semibold transition hover:opacity-90"
      >
        Log out
      </button>
    </div>
  )

  return (
    <header className="flex w-full items-center h-[70px] px-8 justify-between relative bg-white dark:bg-dark-base transition border-b-style">
      <Link href="/" className="relative z-10">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/image-blog-8612c.appspot.com/o/assets%2Flogo.svg?alt=media&token=d2d5a4c9-5bdd-4e59-8f4a-ebf322d76e47"
          width={24}
          height={24}
          alt="blog logo"
        />
      </Link>
      <div className="absolute left-0 right-0 flex justify-center md:hidden">
        <form className="relative flex items-center w-80 h-10 rounded-full bg-[#f0f2f5] dark:bg-[#3a3b3c] text-[#65676b] dark:text-[#b0b3b8] transition">
          <span className="pl-3">
            <FiSearch />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Search Article"
            className="bg-transparent h-full flex-1 px-2 outline-none placeholder:text-center text-[#65676b] dark:text-[#e4e6eb] pr-9"
          />
          <div className="absolute top-14 right-[-50px] left-[-50px]">
            {isSearchResultsVisible && searchQuery && (
              <Headless
                isLoading={isLoading}
                searchQuery={searchQuery}
                data={searchResults}
              />
            )}
          </div>
        </form>
      </div>
      <div className="relative z-10 flex items-center">
        <button onClick={searchModal.onOpen} className="items-center hidden mr-6 md:flex">
          <span className="">
            <FiSearch />
          </span>
        </button>
        <button className="mr-8" onClick={toggleTheme}>
          <div className="text-xl outline-none dark:text-white">
            {isDarkMode ? <FiMoon /> : <FiSun />}
          </div>
        </button>
        {(pathname === '/create' || editPostRegex.test(pathname)) && (
          <button
            onClick={() => {
              editPostRegex.test(pathname)
                ? handleUpdatePost({
                    postId: pathname.split('/')[pathname.split('/').length - 2],
                  })
                : handlePost()
            }}
            className="flex items-center px-3 py-2 font-semibold text-white transition bg-blue-600 rounded-full shadow-md w-fit dark:bg-blue-500 hover:brightness-110 hover:scale-105 mr-7"
          >
            <span className="text-2xl font-bold">
              <MdOutlineCloudUpload />
            </span>
            <span className="block ml-2 font-semibold md:hidden">
              {editPostRegex.test(pathname) ? 'Update' : 'Post'}
            </span>
          </button>
        )}
        {session ? (
          <Popover content={popoverContent} trigger={'hover'}>
            <div className="rounded-full shadow-sm">
              <Avatar userId={session?.user.id} hasBorder />
            </div>
          </Popover>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-full shadow-md dark:bg-blue-500 hover:brightness-110 hover:scale-105"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
