import isUrl from 'is-url'

interface YoutubeProps {
  id: string
}

const Youtube: React.FC<YoutubeProps> = ({ id }) => {
  let searchId: string = id

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

export default Youtube
