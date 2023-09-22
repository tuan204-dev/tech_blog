import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (req: NextRequest) => {
  try {
    await getSessionOrUnauthorized()
    const postId = req.url.split('/')[req.url.split('/').length - 2]
    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    return NextResponse.json('Post deleted')
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
