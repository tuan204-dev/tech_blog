'use client'

import { Post, User } from '@prisma/client'
import SearchItem from './SearchItem'

export interface PostInclUser extends Post {
  user: User
}

interface HeadlessProps {
  data: PostInclUser[]
  searchQuery: string
}

const Headless: React.FC<HeadlessProps> = ({ data, searchQuery }) => {
  return (
    <div className="pt-4 pb-2 rounded-xl h-fit bg-[#fbfbfb] dark:bg-[#171717] shadow-xl max-h-[264px] overflow-hidden overflow-y-scroll scrollbar-hide">
      {data?.map((post) => (
        <SearchItem key={post?.id} {...post} />
      ))}
      {data?.length === 0 && (
        <div className="flex flex-col justify-center mx-6 h-[200px]">
          <p className="text-center text-lg text-[#191919] dark:text-white font-medium">
            No results found for <span className="font-semibold">{searchQuery}</span>
          </p>
          <span className="text-center mt-2 text-[#5c5c5c] dark:text-white">
            Please try again.
          </span>
        </div>
      )}
    </div>
  )
}

export default Headless
