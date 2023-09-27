import prisma from '@/libs/prismadb'
import type { Session } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionOrUnauthorized } from '../../auth/[...nextauth]/options'

// const minify = require('html-minifier').minify

//create new post
export const POST = async (req: NextRequest) => {
  try {
    const session = (await getSessionOrUnauthorized()) as Session
    const { title, rawContent, desc, thumbnail, htmlContent } = await req.json()

    const post = await prisma.post.create({
      data: {
        title,
        rawContent,
        desc,
        thumbnail,
        htmlContent,
        userId: session.user.id,
      },
    })

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
