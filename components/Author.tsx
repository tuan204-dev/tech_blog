import getUserById from '@/libs/actions/server/getUserById'
import { User } from '@prisma/client'
import Image from 'next/image'

interface AuthorProps {
  userId: string
}

const Author: React.FC<AuthorProps> = async ({ userId }) => {
  const author = (await getUserById({ id: userId })) as User

  const { name, username, profileImage, image } = author

  return (
    <div className="flex flex-row gap-4">
      {/* <Link href={`/user/${userId}`}> */}
      <Image
        src={profileImage || image || '/images/placeholder.jpg'}
        alt={name || 'Author'}
        width={60}
        height={60}
        style={{ objectFit: 'cover', borderRadius: '9999px' }}
      />
      {/* </Link> */}
      <div className="flex flex-col justify-start py-1">
        <div
          // href={`/user/${userId}`}
          className="font-semibold hover:underline text-[#3740FF] dark:text-[#9DA2FF] lg:text-lg"
        >
          {name}
        </div>
        {username && (
          <span className="text-sm text-[#585863] dark:text-[#D2D3D7] mt-1">
            @{username}
          </span>
        )}
      </div>
    </div>
  )
}

export default Author
