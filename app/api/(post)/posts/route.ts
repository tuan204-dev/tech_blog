import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '../../auth/[...nextauth]/options'


//get all posts (from, take)
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)

  const from = url.searchParams.get('from')
  const take = url.searchParams.get('take')
  try {
    const session = await getAuthSession()

    if (!session) return NextResponse.json('Unauthorized', { status: 401 })
    const posts =
      (await prisma.post.findMany({
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
