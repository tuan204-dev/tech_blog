import prisma from '@/app/libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

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
  // callbacks: {
  //   async signIn({ user }) {
  //     const session = await getSession();
  //     console.log('session: ', session)
  //     console.log(user)

  //     return true
  //   },
  //   async session({ session, newSession, token, user,  }) {
  //     // session.user!.id = currentUserId as string
  //     // newSession = {...session}
  //     // newSession.user!.id = currentUserId as string
  //     // console.log('token: ', token)
  //     // console.log('session id: ', session)
  //     // return newSession

  //     console.log('user session: ', user)

  //     return session
  //   },
  //   // async jwt({account, token, user, profile, session, trigger}) {
  //   //   console.log({account, token, user, profile, session, trigger})

  //   //   return token
  //   // }
  // },
  // events: {
  //   async signIn(message) {
  //     console.log('msg: ', message)
  //   },
  // },
}
