import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '../../auth/[...nextauth]/options'

//create new comment on post
export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession()

    if (!session) return NextResponse.json('Unauthorized', { status: 401 })

    const { postId, body } = await req.json()

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: session.user.id,
        body,
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
