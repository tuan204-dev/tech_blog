import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession()

  return (
    <div className="flex h-[calc(100vh-70px)] overflow-hidden">
      <div className={`${session ? '' : 'md:hidden'} h-full`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-full overflow-hidden overflow-y-scroll scrollbar-hide">
          <div className="min-h-[calc(100%-80px)]">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
