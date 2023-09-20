'use client'

import { Popover } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { FiMoon, FiSearch, FiSun } from 'react-icons/fi'
import Avatar from './Avatar'

const Header = () => {
  const { theme, systemTheme, setTheme } = useTheme()
  const [isDarkMode, setDarkMode] = useState<boolean>(
    theme === 'dark' || systemTheme === 'dark'
  )

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
        <Image src="./logo.svg" width={24} height={24} alt="blog logo" />
      </Link>
      <div className="absolute right-0 left-0 justify-center  hidden md:flex">
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
        <button className='flex items-center mr-6 md:hidden'>
          <span className="">
            <FiSearch />
          </span>
        </button>
        <button className="lg:ml-8 mr-6" onClick={toggleTheme}>
          <div className="text-xl dark:text-white outline-none">
            {isDarkMode ? <FiMoon /> : <FiSun />}
          </div>
        </button>
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
