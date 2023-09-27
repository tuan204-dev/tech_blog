'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { toggleMarkPost } from '@/libs/actions'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsBookmarkFill, BsBookmarkPlus } from 'react-icons/bs'

interface BookMarkBtnProps {
  postId: string
}

const BookMarkBtn: React.FC<BookMarkBtnProps> = ({ postId }) => {
  const { currentUser, isLoading } = useCurrentUser()
  const [isMarked, setMarked] = useState<boolean>(false)

  useEffect(() => {
    if (!isLoading) {
      const isMarked = currentUser?.bookmarkedIds?.includes(postId)
      setMarked(isMarked)
    }
  }, [isLoading, currentUser, postId])

  const handleToggleMark = useCallback(async () => {
    try {
      await toggleMarkPost({ postId })
      if (isMarked) {
        toast.success('Unmarked!')
      } else {
        toast.success('Marked!')
      }
      setMarked((prev) => !prev)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }, [postId])

  return (
    <button
      onClick={handleToggleMark}
      className="cursor-pointer ml-5 hover:scale-105 transition"
    >
      <span title={isMarked ? 'Un Mark' : 'Mark'} className="text-2xl">
        {isMarked ? <BsBookmarkFill /> : <BsBookmarkPlus />}
      </span>
    </button>
  )
}

export default BookMarkBtn
