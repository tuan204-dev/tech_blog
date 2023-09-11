import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '../../auth/[...nextauth]/options'


//create new post
export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession()

    if (!session) return NextResponse.json('Unauthorized', { status: 401 })
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
