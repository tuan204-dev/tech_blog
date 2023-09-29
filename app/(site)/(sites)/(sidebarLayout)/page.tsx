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
    <div className="pt-10 pb-16 px-10 md:px-2 grid gap-y-16 md:gap-y-8 grid-cols-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 content-evenly auto-rows-max">
      {posts?.map((post: any) => (
        <div key={post.id} className="col-span-2 lg:col-span-3 flex justify-center">
          <PostItem {...post} />
        </div>
      ))}
    </div>
  )
}
