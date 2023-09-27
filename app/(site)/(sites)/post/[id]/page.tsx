import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import Author from '@/components/Author'
import BookMarkBtn from '@/components/BookMarkBtn'
import Footer from '@/components/Footer'
import { getCurrentUser, getPostById } from '@/libs/actions'
import { format } from 'date-fns'
import Link from 'next/link'
import { AiOutlineEdit } from 'react-icons/ai'

export async function generateMetadata({ params }: { params: any }) {
  const postId = params.id

  const post = await getPostById({ postId })

  return {
    title: post?.title || 'Tech Blog',
    description: post?.desc || 'Tech Blog',
    image: post?.thumbnail,
    url: `https://tuandg.vercel.app/post/${postId}`,
  }
}

export default async function Post({ params }: { params: any }) {
  const postId = params.id
  const session = await getAuthSession()
  

  const post = await getPostById({ postId })

  return (
    <>
      <article className="py-10 overflow-hidden min-w-[350px] min-h-[calc(100vh-150px)]">
        <div className="mx-auto flex flex-col items-center w-full max-w-[1200px] px-8 lg:px-7 md:px-6">
          <header className="flex flex-col w-full px-20 lg:px-10 md:px-8">
            <div className="flex items-center">
              <h1 className="flex-1 text-slate-800 dark:text-white text-5xl font-extrabold leading-snug">
                {post?.title}
              </h1>
              <BookMarkBtn postId={postId} />
            </div>
            <span className="text-[#3f3f3f] dark:text-[#f8f9fa] leading-snug mt-11 text-xl">
              {post?.desc}
            </span>
            <div className="mt-8 lg:mt-6 flex flex-col">
              <div className="flex justify-between items-center">
                <Author userId={post?.userId as string} />

                {session?.user?.id === post?.userId && (
                  <Link href={`/post/${postId}/edit`}>
                    <button className="w-fit px-3 py-2 flex items-center rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md hover:brightness-110 hover:scale-105 transition mr-7">
                      <span className="text-2xl font-bold">
                        <AiOutlineEdit />
                      </span>
                      <span className="block md:hidden ml-2 font-semibold">Edit</span>
                    </button>
                  </Link>
                )}
              </div>
              <time className="text-sm text-[#585863] dark:text-[#D2D3D7] mt-8">
                Last updated: {format(new Date(post!.updatedAt), 'PP')}
              </time>
            </div>
          </header>
          <main className="prose dark:prose-invert mt-12 md:mt-10 w-full max-w-[100%]">
            <div dangerouslySetInnerHTML={{ __html: post?.htmlContent as string }}></div>
          </main>
        </div>
      </article>
      <Footer />
    </>
  )
}
