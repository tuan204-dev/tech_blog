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
    <div className='w-full aspect-video px-6 py-3'>
      <iframe className='h-full w-full' src={`https://www.youtube.com/embed/${searchId}`}></iframe>
    </div>
  )
}

interface CodePenProps {
  link: string
}

export const CodePen: React.FC<CodePenProps> = ({ link }) => {
  if (!isUrl(link)) return

  const path = new URL(link).pathname.split('/')
  const userId = path[1]
  const codePenId = path[3]

  return (
    <>
      <iframe
        src={`https://cdpn.io/${userId}/fullembedgrid/${codePenId}?animations=run&type=embed`}
      ></iframe>
      <script async src="http://assets.codepen.io/assets/embed/ei.js"></script>
    </>
  )
}
