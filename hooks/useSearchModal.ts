import { PostInclUser } from '@/components/Headless'
import { create } from 'zustand'

interface SearchModalState {
  isOpen: boolean
  searchQuery?: string
  searchResults?: PostInclUser[]
  setSearchResults: (searchResults: PostInclUser[]) => void
  setSearchQuery: (query: string) => void
  onOpen: () => void
  onClose: () => void
}

const useSearchModal = create<SearchModalState>((set) => ({
  isOpen: false,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, searchQuery: '', searchResults: [] }),
}))

export default useSearchModal
