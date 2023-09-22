import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'

export default async function getSerialize({
  mdValue,
}: {
  mdValue: string
}): Promise<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>> {
  const mdxSource = await serialize(mdValue.replace(/\\n/g, '\\'), {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight as any],
      development: true,
    },
  })

  return {
    compiledSource: mdxSource.compiledSource,
    frontmatter: {},
    scope: {},
  }
}
