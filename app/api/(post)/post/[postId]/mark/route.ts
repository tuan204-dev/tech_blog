import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import prisma from '@/libs/prismadb'

export const PUT = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session
    const postId = req.url.split('/')[req.url.split('/').length - 2]
    const currentUserId = session.user.id

    const currentUser = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    })

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    let userBookmarked = [...(post?.bookmarkedIds || [])]

    const bookMarkIds = currentUser?.bookmarkedIds || []

    const isMarked = bookMarkIds.includes(postId)

    let updatedBookMarkIds = [...bookMarkIds]

    if (isMarked) {
      updatedBookMarkIds = updatedBookMarkIds.filter((id) => id !== postId)
      userBookmarked = userBookmarked.filter((id) => id !== currentUserId)
    } else {
      updatedBookMarkIds.push(postId)
      userBookmarked.push(currentUserId)
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        bookmarkedIds: [...userBookmarked],
      },
    })

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        bookmarkedIds: [...updatedBookMarkIds],
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
