import prisma from '@/libs/prismadb'
import { Post } from '@prisma/client'

export default async function getMarkedPosts({
  userId,
}: {
  userId: string
}): Promise<Post[]> {
  try {
    const markedPosts = await prisma.post.findMany({
      where: {
        bookmarkedIds: {
          has: userId,
        },
      },
    })

    return markedPosts
  } catch (error) {
    console.log(error)
    return []
  }
}
