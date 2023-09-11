import { getAuthSession } from '../api/auth/[...nextauth]/options'
import prisma from '../libs/prismadb'

const getCurrentUser = async () => {
  const session = await getAuthSession()
  if (!session) return null

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  return currentUser
}

export default getCurrentUser
