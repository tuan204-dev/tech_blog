import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const postId = req.url.split('/')[req.url.split('/').length - 3]

    const likesQuantity =
      (await prisma.post.count({
        where: {
          id: postId,
        },
      })) || 0

    return NextResponse.json(likesQuantity)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
