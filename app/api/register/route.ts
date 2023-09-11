import prisma from '@/app/libs/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, name } = await req.json()

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return NextResponse.json('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(newUser)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Bad Request', { status: 400 })
  }
}
