import { postsPerPage } from '@/constants'
import prisma from '@/libs/prismadb'
import { Post } from '@prisma/client'

export default async function getPosts({ page }: { page: number }): Promise<Post[]> {
  try {
    const from = 1 + (page - 1) * postsPerPage
    const take = postsPerPage
    const posts =
      (await prisma.post.findMany({
        where: {
          accepted: true,
          // accepted: true, in production
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: from ? from - 1 : undefined,
        take: take ? take : undefined,
      })) || []

    return posts
  } catch (error) {
    console.log(error)
    return []
  }
}
