import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import type { Session } from 'next-auth'

export const DELETE = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session

    const commentId = req.url.split('/')[req.url.split('/').length - 2]

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!comment) return NextResponse.json('Comment not found', { status: 404 })

    if (comment.userId !== session.user.id)
      return NextResponse.json('Unauthorized', { status: 401 })

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    })

    return NextResponse.json('Comment deleted')
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
