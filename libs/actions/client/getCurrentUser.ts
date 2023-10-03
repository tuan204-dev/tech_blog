import { User } from '@prisma/client'
import axios from 'axios'

export default async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: currentUser } = await axios.get('/api/currentUser')

    return currentUser
  } catch (error) {
    console.log(error)
    return null
  }
}
