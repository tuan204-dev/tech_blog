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

    const bookMarkIds = currentUser?.bookMarkIds || []

    const isMarked = bookMarkIds.includes(postId)

    const updatedBookMarkIds = [...bookMarkIds]

    if (isMarked) {
      updatedBookMarkIds.filter((id) => id !== postId)
    } else {
      updatedBookMarkIds.push(postId)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        bookMarkIds: [...updatedBookMarkIds],
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
