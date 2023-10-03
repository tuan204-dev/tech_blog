import prisma from "@/libs/prismadb"

export default async function getPostsQuantity(): Promise<number> {
  try {
    const postsQuantity = (await prisma.post.count()) || 0
    return postsQuantity
  } catch (error) {
    console.log(error)
    return 0
  }
}