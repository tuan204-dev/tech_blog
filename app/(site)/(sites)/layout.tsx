import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between relative min-h-[max(100vh,600px)]">
      <div className="fixed top-0 left-0 right-0 z-20">
        <Header />
      </div>
      <div className="mt-[70px]">{children}</div>
    </div>
  )
}
