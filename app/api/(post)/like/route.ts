import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/utils/getCurrentUser'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '../../auth/[...nextauth]/options'


// toggle like post
export const PUT = async (req: NextRequest) => {
  try {
    const { postId } = await req.json()
    const session = await getAuthSession()
    if (!session) return NextResponse.json('Unauthorized', { status: 401 })
    const currentUserId = session.user.id
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    if (!post) return NextResponse.json('Post not found', { status: 404 })

    let updatedLikeIds = [...(post.likedIds || [])]

    if (updatedLikeIds.includes(currentUserId)) {
      updatedLikeIds = updatedLikeIds.filter((id) => id !== currentUserId)
    } else {
      updatedLikeIds.push(currentUserId)
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: [...updatedLikeIds],
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
