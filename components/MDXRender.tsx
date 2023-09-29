import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import mdxComponents from './MDXComponents'

interface MDXRenderProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

const MDXRender: React.FC<MDXRenderProps> = ({ source }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="px-16 lg:px-10 md:px-0 w-full relative sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] max-w-[1200px] prose dark:prose-invert">
        <MDXRemote {...source} components={mdxComponents}  />
      </div>
    </div>
  )
}

export default MDXRender
