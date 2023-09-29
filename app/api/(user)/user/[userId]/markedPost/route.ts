import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.url.split('/')[req.url.split('/').length - 2]
    const markedPost = await prisma.post.findMany({
      where: {
        bookmarkedIds: {
          has: userId,
        },
      },
    })

    return NextResponse.json(markedPost)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
