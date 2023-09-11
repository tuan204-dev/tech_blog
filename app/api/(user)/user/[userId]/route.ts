import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.url.split('/')[req.url.split('/').length - 1]

    if (!userId) return NextResponse.json('Invalid user id', { status: 400 })

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) return NextResponse.json('User not found', { status: 404 })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
