import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    await getAuthSession()

    const username = req.url.split('/')[req.url.split('/').length - 1]

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad request', { status: 400 })
  }
}
