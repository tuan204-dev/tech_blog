import Loading from '@/components/Loading'

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-dark-base">
      <Loading size={65} />
    </div>
  )
}

export default loading
