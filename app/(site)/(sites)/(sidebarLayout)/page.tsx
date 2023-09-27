import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import PostItem from '@/components/PostItem'
import { getPosts } from '@/libs/actions'

interface IProps {
  params: any
  searchParams: {
    page: string
  }
}

export default async function Home(props: IProps) {
  const page = parseInt(props.searchParams?.page || '1')
  const posts = await getPosts({ page })

  return (
    <div className="pt-10 pb-16 px-16 md:px-2 flex flex-row flex-wrap gap-16 justify-center">
      {posts?.map((post: any) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  )
}
