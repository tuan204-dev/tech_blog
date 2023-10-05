import { User } from '@prisma/client'
import axios from 'axios'

export default async function getuserByUsername({
  username,
}: {
  username: string
}): Promise<User | null> {
  try {
    const { data: user } = await axios.get(`/api/user/find/username/${username}`)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
