import isUrl from 'is-url'

interface YoutubeProps {
  id: string
}

export const Youtube: React.FC<YoutubeProps> = ({ id }) => {
  let searchId: string = id

  console.log(isUrl(id))

  if (isUrl(id)) {
    searchId = new URL(id).searchParams.get('v')!
  }

  return (
    <div className="w-full aspect-video px-6 py-3">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${searchId}`}
      ></iframe>
    </div>
  )
}

export const a = (props: any) => (
  <a {...props} className="text-[#3740FF] dark:text-[#9DA2FF]"></a>
)

// export const code = (props: any) => <code {...props} className="text-[#DA1039] bg-[#f5f5f5] px-1 py-[2px]"></code>

const mdxComponents = { Youtube, a }

export default mdxComponents
