'use client'

import { Post, User } from '@prisma/client'
import SearchItem from './SearchItem'

export interface PostInclUser extends Post {
  user: User
}

interface HeadlessProps {
  data: PostInclUser[]
}

const Headless: React.FC<HeadlessProps> = ({ data }) => {
  console.log(data)

  return (
    <div className="pt-4 pb-2 rounded-xl h-fit bg-[#fbfbfb] dark:bg-[#171717] shadow-xl max-h-[264px] overflow-hidden overflow-y-scroll scrollbar-hide">
      {data?.map((post) => (
        <SearchItem key={post?.id} {...post} />
      ))}
    </div>
  )
}

export default Headless
