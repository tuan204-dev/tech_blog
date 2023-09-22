import {
  getAuthSession,
  getSessionOrUnauthorized,
} from '@/app/api/auth/[...nextauth]/options'
import type { Session } from 'next-auth'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

//get specific post
export const GET = async (req: NextRequest) => {
  try {
    await getSessionOrUnauthorized()

    const postId = req.url.split('/')[req.url.split('/').length - 1]

    if (!postId) return NextResponse.json('Invalid post id', { status: 400 })

  const post = await prisma.post.findUnique({
      where: {
        id: postId,
        accepted: true,
      },
  })

    if (!post) return NextResponse.json('Post not found', { status: 404 })

    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}

//delete specific post
export const DELETE = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session

    const postId = req.url.split('/')[req.url.split('/').length - 1]

    if (!postId) return NextResponse.json('Invalid post id', { status: 400 })

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!post) return NextResponse.json('Post not found', { status: 404 })

    if (post.userId !== session.user.id)
      return NextResponse.json('Unauthorized', { status: 401 })

    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    return NextResponse.json('Post deleted')
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}

//update specific post
export const PUT = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session

    const { postId, title, rawContent } = await req.json()

    if (!postId) return NextResponse.json('Invalid post id', { status: 400 })

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!post) return NextResponse.json('Post not found', { status: 404 })

    if (post.userId !== session.user.id)
      return NextResponse.json('Unauthorized', { status: 401 })

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        rawContent,
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
