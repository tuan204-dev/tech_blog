import Link from 'next/link'
import { PostInclUser } from './Headless'

const SearchItem: React.FC<PostInclUser> = ({ title, user, id }) => {
  return (
    <Link href={`/post/${id}`}>
      <div className="flex flex-col px-4 py-2 hover:bg-[#ebeced] dark:hover:bg-[#303136] cursor-pointer">
        <h3 className="text-slate-800 dark:text-white text-base font-semibold line-clamp-1">
          {title}
        </h3>
        <span className="text-[#3f3f3f] dark:text-[#f8f9fa] text-sm line-clamp-1">
          {user?.name}
        </span>
      </div>
    </Link>
  )
}

export default SearchItem
