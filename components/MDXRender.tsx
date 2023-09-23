import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import mdxComponents from './MDXComponents'

interface MDXRenderProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

const MDXRender: React.FC<MDXRenderProps> = ({ source }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="px-10 lg:px-16 w-full relative max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1600px] prose dark:prose-invert">
        <MDXRemote {...source} components={mdxComponents} />
      </div>
    </div>
  )
}

export default MDXRender
