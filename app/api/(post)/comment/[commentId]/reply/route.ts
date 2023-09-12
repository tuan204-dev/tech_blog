import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import prisma from '@/app/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session

    const commentId = req.url.split('/')[req.url.split('/').length - 2]

    const { body } = await req.json()

    const repliedComment = await prisma.repliedComment.create({
      data: {
        body,
        commentId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(repliedComment)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
