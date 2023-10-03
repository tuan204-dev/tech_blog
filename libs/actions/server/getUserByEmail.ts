import prisma from "@/libs/prismadb"
import { User } from "@prisma/client"

export default async function getUserByEmail({ email }: { email: string }): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}