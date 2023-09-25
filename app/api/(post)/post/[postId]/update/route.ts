import { getSessionOrUnauthorized } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (req: NextRequest) => {
  try {
    await getSessionOrUnauthorized()
    const postId = req.url.split('/')[req.url.split('/').length - 2]
    const { title, rawContent, desc, thumbnail, htmlContent } = await req.json()

    if (!postId) return NextResponse.json('Invalid post id', { status: 400 })

    const editedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title ? title : undefined,
        rawContent: rawContent ? rawContent : undefined,
        desc: desc ? desc : undefined,
        thumbnail: thumbnail ? thumbnail : undefined,
        htmlContent: htmlContent ? htmlContent : undefined,
      },
    })

    return NextResponse.json(editedPost)
  } catch (error) {
    console.log(error)
    NextResponse.json('Bad Request', { status: 400 })
  }
}
