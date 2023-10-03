import prisma from "@/libs/prismadb"
import { User } from "@prisma/client"

export default async function getUserByUsername({
  username,
}: {
  username: string
}): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
