import { Post } from "@prisma/client"
import axios from "axios"

export default async function handleSearchPost({ query }: { query: string }): Promise<Post[]> {
  try {
    const { data: posts } = (await axios.get(`/api/search?q=${query}`)) || []
    return posts
  } catch (error) {
    console.log(error)
    return []
  }
}
