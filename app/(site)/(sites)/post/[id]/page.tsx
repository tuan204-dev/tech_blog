import { getPostById } from '@/libs/actions'
import getSerialize from '@/utils/getSerialize'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { Youtube } from './../../../../../components/MDXEmbed'
import Author from '@/components/Author'

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

  const post = await getPostById({ postId })

  return (
    <article className="py-10 overflow-hidden">
      <div className="mx-auto p-5 flex flex-col w-full max-w-[650px] items-center">
        <header className="flex flex-col w-full">
          <h1 className="text-black dark:text-white text-5xl font-extrabold leading-9">
            {post?.title}
          </h1>
          <span className="text-[#191919] dark:text-[#f8f9fa] text-base leading-4 mt-11">
            {post?.desc}
          </span>
          <time className="text-sm text-[#585863] dark:text-[#D2D3D7] mt-5">
            {format(new Date(post!.createdAt), 'PP')}
          </time>
          <div className='mt-11 md:mt-12'>
            <Author userId={post?.userId} />
          </div>
        </header>
        <main className="prose dark:prose-invert mt-11 md:mt-12 max-w-[100%]">
          <div>
            <MDXRemote
              components={{ Youtube }}
              source={post?.rawContent.replace(/\\n/g, '\\')}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeHighlight as any],
                  development: true,
                },
              }}
            />
          </div>
        </main>
      </div>
    </article>
  )
}
