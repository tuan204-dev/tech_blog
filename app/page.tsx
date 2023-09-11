import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from './api/auth/[...nextauth]/options'
import prisma from './libs/prismadb'
import axios from 'axios'

async function createStaticUser() {
  const name = 'Anh Tuan'
  const email = 'mail@mail.com'
  const password = '123'

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  console.log(user)
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log('server session: ', session)

  // await createStaticUser()

  return (
    <div>
      {JSON.stringify(session)}
      <div className="flex gap-8">
        <Link href="/login">
          <button>Login</button>
        </Link>
        <Link href="/test">
          <button>Test</button>
        </Link>
      </div>
    </div>
  )
}
