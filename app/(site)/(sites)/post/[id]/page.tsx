import Author from '@/components/Author'
import mdxComponents from '@/components/MDXComponents'
import { getPostById } from '@/libs/actions'
import { format } from 'date-fns'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

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
    <article className="py-10 overflow-hidden min-w-[350px]">
      <div className="mx-auto flex flex-col items-center w-full max-w-[1200px] px-6 md:px-7 lg:px-8">
        <header className="flex flex-col w-full px-4 md:px-6 lg:px-10">
          <h1 className="text-slate-800 dark:text-white text-5xl font-extrabold leading-snug">
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
              components={mdxComponents}
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
