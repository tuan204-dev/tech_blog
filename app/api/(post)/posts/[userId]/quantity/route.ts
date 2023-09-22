import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.url.split('/')[req.url.split('/').length - 2]

    const postsQuantity =
      (await prisma.post.count({
        where: {
          userId,
        },
      })) || 0

    return NextResponse.json(postsQuantity)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
