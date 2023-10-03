'use client'

import { Tooltip } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { BiHomeAlt2, BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { BsBookmarkCheck } from 'react-icons/bs'
import { GoPaperAirplane } from 'react-icons/go'
import { HiOutlineUser } from 'react-icons/hi'
import { IoCreateOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  const [isExpanded, setExpanded] = useState<boolean>(false)
  const { data: session } = useSession()

  const sidebarItems: ISidebarItem[] = useMemo(
    () => [
      {
        icon: BiHomeAlt2,
        title: 'Home',
        href: '/',
      },
      {
        icon: HiOutlineUser,
        title: 'Profile',
        href: '/account',
      },
      {
        icon: IoCreateOutline,
        title: 'Create Article',
        href: '/create',
      },
      {
        icon: BsBookmarkCheck,
        title: 'Bookmarks',
        href: '/bookmarks',
      },
    ],
    []
  )

  return (
    <aside
      className={`border-r-style relative transition group h-full ${
        isExpanded ? 'w-60' : 'w-12'
      }`}
    >
      <div className="absolute z-10 top-[10%] bg-transparent w-4 right-0 translate-x-1/2 flex items-center justify-center cursor-pointer transition opacity-0 group-hover:opacity-100 md:hidden">
        <Tooltip placement="right" title={isExpanded ? 'Shrink' : 'Expand'}>
          <span
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2 text-xl bg-gray-100 rounded-full dark:bg-gray-800"
          >
            {isExpanded ? (
              <BiLeftArrow className="translate-x-[-2px]" />
            ) : (
              <BiRightArrow className="translate-x-[2px]" />
            )}
          </span>
        </Tooltip>
      </div>
      <div className="flex flex-col justify-center h-full">
        {sidebarItems?.map((item) => (
          <SidebarItem
            href={item.href}
            icon={item.icon}
            title={item.title}
            key={item.href}
            isExpanded={isExpanded}
          />
        ))}
        <Tooltip placement="right" title={!isExpanded && 'Contact'}>
          <a
            href={'https://tuan204-dev.netlify.app/'}
            target="_blank"
            className="flex items-center h-12 w-full hover:bg-[#dcdee0] dark:hover:bg-[#2d323b] transition duration-[50ms] bg-transparent"
          >
            <span className={`text-2xl ${!isExpanded ? 'mx-auto' : 'px-2'}`}>
              <GoPaperAirplane />
            </span>
            {isExpanded && <p className="text-sm font-semibold">Contact</p>}
          </a>
        </Tooltip>
        {session && (
          <Tooltip placement="right" title={!isExpanded && 'Logout'}>
            <button
              className="items-center h-12 w-full bg-transparent flex  hover:bg-[#dcdee0] dark:hover:bg-[#2d323b] transition duration-[50ms]"
              onClick={() => signOut()}
            >
              <span className={`text-2xl ${!isExpanded ? 'mx-auto' : 'px-2'}`}>
                <LuLogOut />
              </span>
              {isExpanded && <p className="text-sm font-semibold">Logout</p>}
            </button>
          </Tooltip>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
