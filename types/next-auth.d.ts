import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

// type UserId = string

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: UserId
//     username?: string | null
//   }
// }

// declare module 'next-auth' {
//   interface Session {
//     id: UserId
//     username?: string | null
//   }
// }

// import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      bio: string | null
      username: string | null
      image: string | null
      coverImage: string | null
      profileImage: string | null
      createdAt: Date
      updatedAt: Date
      followingIds: string[]
    }
  }

  // interface User extends DefaultUser {
  //   profileImage: string | null
  // }
}

// declare module '@next-auth/prisma-adapter' {
//   interface User {
//     user: DefaultUser['user'] & {
//       profileImage: string | null
//     }
//   }
// }

// declare module "next-auth" {
//   interface User {
//     id: string; // Or string
//   }
// }
