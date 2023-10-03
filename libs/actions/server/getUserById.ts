import prisma from '@/libs/prismadb'
import { User } from '@prisma/client'

export default async function getUserById({ id }: { id: string }): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
