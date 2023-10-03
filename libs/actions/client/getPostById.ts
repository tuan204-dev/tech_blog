import { Post } from '@prisma/client'
import axios from 'axios'

export default async function getPostById({
  postId,
}: {
  postId: string
}): Promise<Post | null> {
  try {
    const { data: post } = await axios.get(`/api/post/${postId}`)
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}
