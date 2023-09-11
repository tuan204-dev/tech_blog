import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'


// get all posts from user (from, take)
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const userId = url.pathname.split('/')[url.pathname.split('/').length - 1]

  const from = url.searchParams.get('from')
  const take = url.searchParams.get('take')

  try {
    const session = await getAuthSession()

    if (!session) return NextResponse.json('Unauthorized', { status: 401 })
    const posts =
      (await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: from ? parseInt(from) - 1 : undefined,
        take: take ? parseInt(take) : undefined,
      })) || []

    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
