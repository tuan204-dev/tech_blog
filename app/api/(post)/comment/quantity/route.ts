import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const { postId } = await req.json()

    if (!postId) return NextResponse.json('Bad Request', { status: 400 })

    const commentsQuantity = await prisma.comment.count({
      where: {
        postId,
      },
    }) || 0

    return NextResponse.json(commentsQuantity)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
