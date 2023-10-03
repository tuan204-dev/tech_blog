import { Post } from '@prisma/client'
import axios from 'axios'

export default async function createPost({
  title,
  desc,
  rawContent,
  thumbnail,
  htmlContent,
  estimatedTime,
}: {
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
  estimatedTime: string
}): Promise<Post | null> {
  try {
    const { data: newPost } = await axios.post('/api/post', {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
      estimatedTime,
    })
    return newPost
  } catch (error) {
    console.log(error)
    return null
  }
}
