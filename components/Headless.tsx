'use client'

import { Post, User } from '@prisma/client'
import SearchItem from './SearchItem'
import Loading from './Loading'

export interface PostInclUser extends Post {
  user: User
}

interface HeadlessProps {
  data: PostInclUser[]
  searchQuery: string
  isLoading?: boolean
}

const Headless: React.FC<HeadlessProps> = ({ data, searchQuery, isLoading }) => {
  return (
    <div
      className={`pt-4 pb-2 rounded-xl h-fit bg-[#fbfbfb] dark:bg-[#171717] shadow-xl min-h-[240px] max-h-[264px] overflow-hidden overflow-y-scroll scrollbar-hide ${
        isLoading ? 'flex items-center justify-center' : ''
      }`}
    >
      {!isLoading ? (
        data?.length === 0 ? (
          <div className="flex flex-col justify-center mx-6 h-[200px]">
            <p className="text-center text-lg text-[#191919] dark:text-white font-medium">
              No results found for <span className="font-semibold">{searchQuery}</span>
            </p>
            <span className="text-center mt-2 text-[#5c5c5c] dark:text-white">
              Please try again.
            </span>
          </div>
        ) : (
          data?.map((post) => <SearchItem key={post?.id} {...post} />)
        )
      ) : (
        <div className="flex items-center justify-center h-full">
          <Loading size={50} />
        </div>
      )}
    </div>
  )
}

export default Headless
