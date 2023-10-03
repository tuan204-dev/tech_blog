import { User } from '@prisma/client'
import axios from 'axios'

export default async function createAccountWithCredentials({
  email,
  password,
  name,
  username,
}: {
  email: string
  password: string
  name: string
  username: string
}): Promise<User | null> {
  try {
    const { data: newAccount } = await axios.post('/api/register', {
      email,
      password,
      name,
      username,
    })
    return newAccount
  } catch (error) {
    console.log(error)
    return null
  }
}
