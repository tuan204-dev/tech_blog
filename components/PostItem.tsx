import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

interface PostItemProps extends IPost {}

export default function PostItem({
  title,
  thumbnail,
  desc,
  createdAt,
  id,
}: PostItemProps) {
  return (
    <Link href={`/post/${id}`}>
      <article className="w-72 h-[340px] p-4 rounded-2xl shadow-lg bg-[#f5f8fc] flex flex-col justify-between">
        <div className="flex flex-col px-4">
          <h2 className="text-black dark:text-white text-2xl font-extrabold leading-7 line-clamp-2">
            {title}
          </h2>
          <span className="text-[#191919] dark:text-[#f8f9fa] text-base leading-snug mt-4 line-clamp-2">
            {desc}
          </span>
          <time className="text-sm text-[#585863] dark:text-[#D2D3D7] mt-2 ">
            {format(new Date(createdAt), 'PP')}
          </time>
        </div>
        <div className="overflow-hidden rounded-xl my-4 shadow-sm">
          <Image
            src={thumbnail}
            width={320}
            height={160}
            alt={title}
            style={{ objectFit: 'contain', width: '100%', height: '160px' }}
          />
        </div>
      </article>
    </Link>
  )
}
