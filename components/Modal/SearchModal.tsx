'use client'

import useSearchArticle from '@/hooks/useSearchArticle'
import useSearchModal from '@/hooks/useSearchModal'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Loading from '../Loading'
import SearchItem from '../SearchItem'

const SearchModal: React.FC = () => {
  const { isOpen, onClose } = useSearchModal()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchQueryDebounce, setSearchQueryDebounce] = useState<string>('')
  const { data: searchResults, isLoading } = useSearchArticle(searchQueryDebounce)

  console.log(isLoading)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQueryDebounce(searchQuery)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <Modal open={isOpen} onClose={onClose} className="hidden h-screen md:block">
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
        <div className="flex items-center justify-center flex-1">
          {!isLoading ? (
            searchQuery && searchResults?.length === 0 ? (
              <div className="flex flex-col mx-6">
                <p className="text-center text-lg text-[#191919] dark:text-white font-medium">
                  No results found for{' '}
                  <span className="font-semibold">{searchQuery}</span>
                </p>
                <span className="text-center mt-2 text-[#5c5c5c] dark:text-white">
                  Please try again.
                </span>
              </div>
            ) : (
              <div className="h-full mt-5 overflow-hidden overflow-y-scroll">
                {searchResults?.map((post) => (
                  <div key={post?.id} onClick={onClose}>
                    <SearchItem {...post} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div>
              <Loading size={60} />
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default SearchModal
