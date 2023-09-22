import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'

export const PUT = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session
    const { name, username, bio, profileImage, coverImage } = await req.json()

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name ? name : undefined,
        username: username ? username : undefined,
        bio: bio ? bio : undefined,
        profileImage: profileImage ? profileImage : undefined,
        coverImage: coverImage ? coverImage : undefined,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad request', { status: 400 })
  }
}
