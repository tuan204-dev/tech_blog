import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[calc(100vh-70px)] overflow-hidden'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <div className='h-[calc(100%-80px)] overflow-hidden overflow-y-scroll scrollbar-hide'>{children}</div>
        <Footer />
      </div>
    </div>
  )
}
