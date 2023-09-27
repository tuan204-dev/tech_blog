import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import Footer from '@/components/Footer'
import PostItem from '@/components/PostItem'
import Sidebar from '@/components/Sidebar'
import { getPosts } from '@/libs/actions'

interface IProps {
  params: any
  searchParams: {
    page: string
  }
}

export default async function Home(props: IProps) {
  const session = await getAuthSession()
  const page = parseInt(props.searchParams?.page || '1')
  const posts = await getPosts({ page })

  return (
    <div className="flex h-[calc(100vh-70px)]">
      {session && <Sidebar />}
      <div className="flex-1 h-full overflow-hidden overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col">
          <div className="pt-10 pb-16 px-16 flex flex-row flex-wrap gap-16 justify-center">
            {posts?.map((post: any) => (
              <PostItem key={post.id} {...post} />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
