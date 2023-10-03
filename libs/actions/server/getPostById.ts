import prisma from '@/libs/prismadb'
import { Post } from '@prisma/client'

export default async function getPostById({
  postId,
}: {
  postId: string
}): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    return post
  } catch (error) {
    console.log(error)
    return null
  }
}
