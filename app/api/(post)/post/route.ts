import prisma from '@/app/libs/prismadb'
import type { Session } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionOrUnauthorized } from '../../auth/[...nextauth]/options'

//create new post
export const POST = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session
    const { title, body, rawBody, desc = '' } = await req.json()

    const post = await prisma.post.create({
      data: {
        title,
        body,
        rawBody,
        desc,
        userId: session.user.id,
      },
    })

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
