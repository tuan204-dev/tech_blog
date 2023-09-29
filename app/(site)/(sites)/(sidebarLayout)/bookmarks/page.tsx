import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import PostItem from '@/components/PostItem'
import { getMarkedPosts } from '@/libs/actions'
import { redirect } from 'next/navigation'

export async function generateMetadata() {
  return {
    title: 'Bookmarks - Tech Blog',
  }
}

export default async function Bookmarks() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  const markedPosts = await getMarkedPosts({ userId: session.user.id })

  return (
    <div className="pt-10 pb-16 px-10 md:px-2 grid gap-y-16 md:gap-y-8 grid-cols-8 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 content-evenly auto-rows-max">
      {markedPosts?.map((post: any) => (
        <div key={post.id} className="col-span-2 lg:col-span-3 flex justify-center">
          <PostItem {...post} />
        </div>
      ))}
    </div>
  )
}
