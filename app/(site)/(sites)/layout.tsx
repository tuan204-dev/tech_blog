import Header from '@/app/components/Header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <div>{children}</div>
    </div>
  )
}
