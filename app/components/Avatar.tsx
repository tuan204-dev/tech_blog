'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import useUser from '../hooks/useUser'
import Image from 'next/image'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, hasBorder, isLarge }) => {
  const router = useRouter()

  const { user } = useUser(userId)

  const handleClick = useCallback(() => {
    if (userId) {
      router.push(`/user/${userId}`)
    }
  }, [router, userId])

  return (
    <div
      className={`
        rounded-full
        transition
        relative
        cursor-pointer
        hover:brightness-90
        ${hasBorder ? 'border-[3px] border-[#a9a9a9] ' : ''}
        ${isLarge ? 'w-32' : 'w-10'}
        ${isLarge ? 'h-32' : 'h-10'}
      `}
    >
      <Image
        alt="Avatar"
        onClick={handleClick}
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        src={user?.profileImage || user?.image || '/images/placeholder.jpg'}
        width={isLarge ? 128 : 40}
        height={isLarge ? 128 : 40}
      />
    </div>
  )
}

export default Avatar
