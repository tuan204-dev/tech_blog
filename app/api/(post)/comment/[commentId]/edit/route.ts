import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'

export const PUT = async (req: NextRequest) => {
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

    const { body } = await req.json()

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        body,
      },
    })

    return NextResponse.json(updatedComment)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
