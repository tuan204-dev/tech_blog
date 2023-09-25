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
    <div className="w-full aspect-video px-6 md:px-0 py-3">
      <iframe
      loading="lazy"
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${searchId}`}
      ></iframe>
    </div>
  )
}

export const a = (props: any) => (
  <a {...props} className="text-[#3740FF] dark:text-[#9DA2FF]"></a>
)

export const img = (props: any) => (
  <div className='flex justify-center overflow-hidden'>
    <img loading="lazy" {...props}/>
  </div>
)

// export const code = (props: any) => <code {...props} className="text-[#DA1039] bg-[#f5f5f5] px-1 py-[2px]"></code>

const mdxComponents = { Youtube, a, img }

export default mdxComponents
