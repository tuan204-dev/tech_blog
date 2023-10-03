import { Post } from '@prisma/client'
import axios from 'axios'

export default async function updatePost({
  postId,
  title,
  desc,
  rawContent,
  thumbnail,
  htmlContent,
  estimatedTime,
}: {
  postId: string
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
  estimatedTime: string
}): Promise<Post | null> {
  try {
    const { data: updatedPost } = await axios.put(`/api/post/${postId}/update`, {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
      estimatedTime,
    })
    return updatedPost
  } catch (error) {
    console.log(error)
    return null
  }
}
