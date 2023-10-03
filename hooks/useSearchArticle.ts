import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
import { PostInclUser } from '@/components/Headless'

const useSearchArticle = (
  query: string
): { data: PostInclUser[]; error: any; isLoading: boolean; mutate: () => void } => {
  const { data, error, isLoading, mutate } = useSWR(
    query ? `/api/search?q=${query}` : null,
    fetcher
  )

  return { data, error, isLoading, mutate }
}

export default useSearchArticle
