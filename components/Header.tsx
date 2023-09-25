'use client'

import { Popover } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useContext, useState } from 'react'
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { EditorContext } from '../contexts/EditorContext'
import Avatar from './Avatar'

const Header = () => {
  const { theme, systemTheme, setTheme } = useTheme()
  const [isDarkMode, setDarkMode] = useState<boolean>(
    theme === 'dark' || systemTheme === 'dark'
  )

  const { handlePost, handleUpdatePost } = useContext(EditorContext)

  const pathname = usePathname()
  const editPostRegex = new RegExp('^/post/[^/]+/edit$')

  const { data: session } = useSession()

  const toggleTheme = useCallback(
    (e: any) => {
      e.preventDefault()
      setTheme(isDarkMode ? 'light' : 'dark')
      setDarkMode((prev) => !prev)
    },
    [isDarkMode, setTheme]
  )

  const popoverContent = (
    <div>
      <button
        onClick={() => signOut()}
        className="font-semibold h-full hover:opacity-90 transition"
      >
        Log out
      </button>
    </div>
  )

  return (
    <header className="flex w-full items-center h-[70px] px-8 justify-between shadow-sm relative bg-white dark:bg-dark-base transition">
      <Link href="/" className="relative z-10">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/image-blog-8612c.appspot.com/o/assets%2Flogo.svg?alt=media&token=d2d5a4c9-5bdd-4e59-8f4a-ebf322d76e47"
          width={24}
          height={24}
          alt="blog logo"
        />
      </Link>
      <div className="absolute right-0 left-0 justify-center flex md:hidden">
        <form className="flex items-center w-80 h-10 rounded-full bg-[#f0f2f5] dark:bg-[#3a3b3c] text-[#65676b] dark:text-[#b0b3b8] transition">
          <span className="pl-3">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Search Article"
            className="bg-transparent h-full flex-1 px-2 outline-none placeholder:text-center text-[#65676b] dark:text-[#e4e6eb] pr-9"
          />
        </form>
      </div>
      <div className="flex items-center relative z-10">
        <button className="hidden md:flex items-center mr-6 ">
          <span className="">
            <FiSearch />
          </span>
        </button>
        <button className="mr-8" onClick={toggleTheme}>
          <div className="text-xl dark:text-white outline-none">
            {isDarkMode ? <FiMoon /> : <FiSun />}
          </div>
        </button>
        {(pathname === '/admin' || editPostRegex.test(pathname)) && (
          <button
            onClick={() => {
              editPostRegex.test(pathname)
                ? handleUpdatePost({
                    postId: pathname.split('/')[pathname.split('/').length - 2],
                  })
                : handlePost()
            }}
            className="w-fit px-3 py-2 flex items-center rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md hover:brightness-110 hover:scale-105 transition mr-7"
          >
            <span className="text-2xl font-bold">
              <MdOutlineCloudUpload />
            </span>
            <span className="block md:hidden ml-2 font-semibold">
              {editPostRegex.test(pathname) ? 'Update' : 'Post'}
            </span>
          </button>
        )}
        {session ? (
          <Popover content={popoverContent} trigger={'hover'}>
            <div className="shadow-sm rounded-full">
              <Avatar userId={session?.user.id} hasBorder />
            </div>
          </Popover>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md hover:brightness-110 hover:scale-105 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
