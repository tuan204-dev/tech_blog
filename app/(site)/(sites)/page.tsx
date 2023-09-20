import bcrypt from 'bcrypt'
import Link from 'next/link'
import prisma from '../../libs/prismadb'

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
  return (
    <div className="dark:text-white">
      <div className="flex gap-8">
        <Link href="/login">
          <button>Login</button>
        </Link>
        <Link href="/register">
          <button>Register</button>
        </Link>
        <Link href="/test">
          <button>Test</button>
        </Link>
        <Link href="/admin">
          <button>Create Post</button>
        </Link>
      </div>
    </div>
  )
}
