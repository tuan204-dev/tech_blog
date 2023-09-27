import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="border-t-style flex justify-between items-center bg-white dark:bg-[#121212] px-16 h-20 md:h-14 lg:px-10 md:px-8 w-full relative sm:max-w-[600px] md:max-w-[760px] lg:max-w-[1000px] max-w-[1200px] mx-auto">
      <p className="text-sm font-semibold text-[#04052F] dark:text-[#E8E8FD]">
        © 2023 Tech Blog ——{' '}
        <a
          className="text-[#575757] dark:text-[#C4C9D4] italic"
          href="https://tuan204-dev.netlify.app/"
          target="_blank"
        >
          Tuan Dang
        </a>
      </p>
      <Link href="/">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/image-blog-8612c.appspot.com/o/assets%2Flogo.svg?alt=media&token=d2d5a4c9-5bdd-4e59-8f4a-ebf322d76e47"
          alt="Logo"
          width={35}
          height={35}
          style={{ objectFit: 'contain' }}
          className='w-[35px] h-[35px] md:w-[30px] md:h-[30px]'
        />
      </Link>
    </footer>
  )
}
export default Footer
