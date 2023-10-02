'use client'

import useSearchModal from '@/hooks/useSearchModal'
import Modal from '@mui/material/Modal'
import { BiLeftArrowAlt } from 'react-icons/bi'
import SearchItem from '../SearchItem'

const SearchModal: React.FC = () => {
  const { isOpen, onClose, searchQuery, setSearchQuery, searchResults } = useSearchModal()

  return (
    <Modal open={isOpen} onClose={onClose} className="h-screen hidden md:block">
      <div className="flex flex-col h-full bg-[#fbfbfb] dark:bg-[#171717]">
        <header className="h-[70px] flex items-center border-b-style mx-4">
          <form className="relative flex items-center w-full h-10 rounded-full bg-[#f0f2f5] dark:bg-[#3a3b3c] text-[#65676b] dark:text-[#b0b3b8] transition">
            <button className="flex items-center" onClick={onClose}>
              <span className="pl-3 text-xl">
                <BiLeftArrowAlt />
              </span>
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Article"
              className="bg-transparent h-full flex-1 px-2 outline-none placeholder:text-center text-[#65676b] dark:text-[#e4e6eb] pr-9"
            />
          </form>
        </header>
        <div className="flex-1 justify-center flex items-center">
          {searchQuery && searchResults?.length === 0 ? (
            <div className="flex flex-col mx-6">
              <p className="text-center text-lg text-[#191919] dark:text-white font-medium">
                No results found for <span className="font-semibold">{searchQuery}</span>
              </p>
              <span className="text-center mt-2 text-[#5c5c5c] dark:text-white">
                Please try again.
              </span>
            </div>
          ) : (
            <div className="h-full overflow-hidden overflow-y-scroll mt-5">
              {searchResults?.map((post) => (
                <div key={post?.id} onClick={onClose}>
                  <SearchItem {...post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal
