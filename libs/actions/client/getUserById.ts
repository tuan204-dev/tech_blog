import getURL from '@/utils/getURL'
import { User } from '@prisma/client'
import axios from 'axios'

export default async function getUserById({
  id,
}: {
  id: string
}): Promise<User | null> {
  try {
    const { data: user } = await axios.get(`/api/user/${id}`)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
