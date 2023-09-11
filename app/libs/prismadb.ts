import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   let globalWithPrisma = global as typeof globalThis & {
//     prisma: PrismaClient
//   }
//   if (!globalWithPrisma.prisma) {
//     globalWithPrisma.prisma = new PrismaClient()
//   }
//   prisma = globalWithPrisma.prisma
// }

// export default prisma

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }

  prisma = global.cachedPrisma
}

export default prisma
