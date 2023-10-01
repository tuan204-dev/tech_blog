import prisma from '@/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url)

    const query = url.searchParams.get('q')

    const posts =
      (await prisma.post.findMany({
        where: {
          OR: [
            {
              rawContent: {
                contains: query as string,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          user: true,
        },
      })) || []

    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad request', { status: 400 })
  }
}
