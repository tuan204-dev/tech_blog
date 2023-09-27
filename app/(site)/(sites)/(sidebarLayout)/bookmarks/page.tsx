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
    <div className="flex-1 pt-10 pb-16 px-16 h-min-[100%] flex flex-row flex-wrap gap-16 justify-center">
      {markedPosts?.map((post: any) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  )
}
