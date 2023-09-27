import useSWR from 'swr'
import fetcher from '../libs/fetcher'
import { User } from '@prisma/client'

const useCurrentUser = () => {
  const {
    data: currentUser,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/currentUser', fetcher)

  return { currentUser, error, isLoading, mutate } as {
    currentUser: User
    error: any
    isLoading: boolean
    mutate: any
  }
}

export default useCurrentUser
