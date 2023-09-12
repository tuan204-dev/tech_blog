import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const postsQuantity = await prisma.post.count() || 0

    return NextResponse.json(postsQuantity)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
