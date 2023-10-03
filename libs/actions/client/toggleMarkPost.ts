import axios from "axios"

export default async function toggleMarkPost({ postId }: { postId: string }) {
  try {
    const { data: updatedUser } = await axios.put(`/api/post/${postId}/mark`)
    return updatedUser
  } catch (error) {
    console.log(error)
  }
}