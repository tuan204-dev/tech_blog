import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import prisma from '@/libs/prismadb'

export const PUT = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session
    const userId = req.url.split('/')[req.url.split('/').length - 2]

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return NextResponse.json('User not found', { status: 404 })
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    const isFollowing = user.followerIds.includes(session.user.id)

    let updatedUser

    if (isFollowing) {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followerIds: [...user.followerIds.filter((id) => id !== session.user.id)],
        },
      })
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          followingIds: [...currentUser!.followingIds.filter((id) => id !== userId)],
        },
      })
    } else {
      updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followerIds: [...user.followerIds, session.user.id],
        },
      })
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          followingIds: [...currentUser!.followingIds, userId],
        },
      })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
