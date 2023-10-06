import PostItem from '@/components/PostItem'
import { postsPerPage } from '@/constants'
import getPosts from '@/libs/actions/server/getPost'
import getPostsQuantity from '@/libs/actions/server/getPostsQuantity'
import { Pagination } from 'antd'
import { redirect } from 'next/navigation'

interface IProps {
  params: any
  searchParams: {
    page: string
  }
}

const handlePaginate = async (page: number) => {
  'use server'

  redirect(`/?page=${page}`)
}

export default async function Home(props: IProps) {
  const page = parseInt(props.searchParams?.page || '1')
  const totalPosts = await getPostsQuantity()
  const totalPages = Math.ceil(totalPosts / postsPerPage)


  if (page > totalPages) redirect('/')

  const posts = await getPosts({ page })

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-[calc(100vh-150px)] w-full pt-10 pb-10 md:py-6 px-10 md:px-2 grid gap-y-16 md:gap-y-8 grid-cols-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 content-evenly auto-rows-max">
        {posts?.map((post: any) => (
          <div key={post.id} className="col-span-2 lg:col-span-3 flex justify-center">
            <PostItem {...post} />
          </div>
        ))}
      </div>
      <div className="mb-5">
        <Pagination
          defaultCurrent={1}
          total={totalPosts}
          pageSize={postsPerPage}
          onChange={handlePaginate}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}
