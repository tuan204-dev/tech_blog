import useSWR from 'swr'
import fetcher from '../libs/fetcher'

const useCurrentUser = () => {
  const {
    data: currentUser,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/currentUser', fetcher)

  return { currentUser, error, isLoading, mutate }
}

export default useCurrentUser
