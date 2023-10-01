import { Post } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

interface PostItemProps extends Post {}

export default function PostItem({
  title,
  thumbnail,
  desc,
  createdAt,
  id,
  estimatedTime,
}: PostItemProps) {
  return (
    <Link href={`/post/${id}`}>
      <article className="w-80 md:w-72 h-[360px] p-4 rounded-2xl shadow-lg bg-[#f5f8fc] dark:bg-[#1c1f26] flex flex-col justify-between hover:scale-[1.05] lg:hover:scale-100 transition-all">
        <div className="flex flex-col px-4">
          <h2 className="text-black dark:text-white text-2xl font-extrabold leading-7 line-clamp-2">
            {title}
          </h2>
          <span className="text-[#191919] dark:text-[#f8f9fa] text-base leading-snug mt-4 line-clamp-2">
            {desc}
          </span>
          <div className="flex items-center gap-1 mt-2 text-[#585863] dark:text-[#D2D3D7]">
            <time className="text-sm ">
              {format(new Date(createdAt), 'PP')}
            </time>
            <span>-</span>
            <span className="text-sm ">
              {estimatedTime} min read
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-40 rounded-xl my-4 shadow-sm w-fit">
          <Image
            src={thumbnail}
            width={320}
            height={160}
            alt={title}
            style={{
              objectFit: 'contain',
              height: '100%',
              objectPosition: 'center',
              borderRadius: '12px',
            }}
          />
        </div>
      </article>
    </Link>
  )
}
