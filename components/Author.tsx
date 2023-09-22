import { getUserById } from '@/libs/actions'
import Image from 'next/image'
import Link from 'next/link'

interface AuthorProps {
  userId: string
}

const Author: React.FC<AuthorProps> = async ({ userId }) => {
  const author = await getUserById({ id: userId })

  const { name, username, profileImage, image } = author

  return (
    <div className="flex flex-row gap-4">
      <Link href={`/user/${userId}`}>
        <Image
          src={profileImage || image}
          alt={name}
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: '9999px' }}
        />
      </Link>
      <div className="flex flex-col justify-start py-1">
        <Link
          href={`/user/${userId}`}
          className="font-semibold hover:underline text-[#3740FF] dark:text-[#9DA2FF] lg:text-lg"
        >
          {name}
        </Link>
        {username && <span>@{username}</span>}
      </div>
    </div>
  )
}

export default Author
