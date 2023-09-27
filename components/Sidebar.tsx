'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { useMemo, useState } from 'react'
import { BiHomeAlt2, BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { BsBookmarkCheck } from 'react-icons/bs'
import { GoPaperAirplane } from 'react-icons/go'
import { HiOutlineUser } from 'react-icons/hi'
import { IoCreateOutline } from 'react-icons/io5'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  const { currentUser } = useCurrentUser()
  const [isExpanded, setExpanded] = useState<boolean>(false)

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
      {
        icon: GoPaperAirplane,
        title: 'Contact me',
        href: '/https://tuan204-dev.netlify.app/#contact',
      },
    ],
    []
  )

  return (
    <aside
      className={`border-r-style relative transition group md:hidden ${
        isExpanded ? 'w-60' : 'w-12'
      }`}
    >
      <div className="absolute z-10 top-[10%] bg-transparent w-4 right-0 translate-x-1/2 flex items-center justify-center cursor-pointer transition opacity-0 group-hover:opacity-100">
        <span
          onClick={() => setExpanded((prev) => !prev)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xl"
        >
          {isExpanded ? (
            <BiLeftArrow className="translate-x-[-2px]" />
          ) : (
            <BiRightArrow className="translate-x-[2px]" />
          )}
        </span>
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
      </div>
    </aside>
  )
}

export default Sidebar
