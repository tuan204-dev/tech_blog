import prisma from '@/app/libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          return null
        }

        console.log(credentials)

        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXUAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email) return session

      const currentUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })

      // add more user info to session
      if (currentUser) {
        session.user.name = currentUser.name
        session.user.email = currentUser.email
        session.user.id = currentUser.id as string
        session.user.bio = currentUser.bio
        session.user.username = currentUser.username
        session.user.image = currentUser.image
        session.user.coverImage = currentUser.coverImage
        session.user.profileImage = currentUser.profileImage
        session.user.createdAt = currentUser.createdAt
        session.user.updatedAt = currentUser.updatedAt
        session.user.followingIds = currentUser.followingIds
      }

      return session
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)

export const getSessionOrUnauthorized = async () => {
  const session = await getAuthSession()
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 401 })
  }
  return session
}
