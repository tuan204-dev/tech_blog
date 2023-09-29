'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { User } from '@prisma/client'
import { getUserById, getUserByUsername, updateCurrentUser } from '@/libs/actions'
import Image from 'next/image'
import { HiOutlineCamera } from 'react-icons/hi'
import { BiUser } from 'react-icons/bi'
import handleUploadImage from '@/utils/handleUploadImage'
import toast from 'react-hot-toast'

const Account: React.FC = () => {
  const { currentUser, isLoading } = useCurrentUser()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [fullName, setFullName] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [bio, setBio] = useState<string>()
  const [usernameExisted, setUsernameExisted] = useState<boolean>(false)

  const [isChanging, setChanging] = useState<boolean>(false)

  const { mutate } = useCurrentUser()

  const router = useRouter()

  const avatarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login')
    }
  }, [isLoading, currentUser])

  useEffect(() => {
    if (currentUser?.id) {
      ;(async () => {
        const user = (await getUserById({ id: currentUser.id })) as User
        setAvatarUrl(user?.profileImage || user?.image || '')
        setFullName(user?.name as string)
        setUsername(user?.username || '')
        setBio(user?.bio || '')
      })()
    }
  }, [currentUser])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (username) {
        ;(async () => {
          const user = await getUserByUsername({ username })
          setUsernameExisted(Boolean(user) && user?.username !== username)
        })()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [username])

  useEffect(() => {
    ;(async () => {
      try {
        if (!avatarFile) return
        document.body.style.cursor = 'progress'
        const avatarUrl = await handleUploadImage(avatarFile as File)
        setAvatarUrl(avatarUrl as string)
        document.body.style.cursor = 'default'
        toast.success('Avatar changed successfully!')
      } catch (error) {
        console.log(error)
        toast.error('Error change avatar!')
        document.body.style.cursor = 'default'
      }
    })()
  }, [avatarFile])

  const handleSubmit = async () => {
    setChanging(true)
    await updateCurrentUser({
      avatarUrl,
      fullName: fullName as string,
      username: username?.trim() as string,
      bio: bio as string,
    })
    toast.success('Profile saved!')
    setChanging(false)
    mutate()
    router.push('/')
  }

  console.log(usernameExisted)

  return (
    <div className="flex justify-center">
      <div className="max-w-[760px] w-full flex flex-col overflow-hidden overflow-y-scroll scrollbar-hide">
        <h1 className="text-black dark:text-white block px-6 py-4 text-center text-3xl font-bold">
          Profile
        </h1>
        <div className="flex-1 p-6 flex flex-col">
          <div>
            <h2 className="text-[17px] text-black dark:text-white font-bold">
              Profile Picture
            </h2>
            <span className="text-[15px] text-[#525866] dark:text-[#A8B3CF] pt-1">
              Upload a picture to make your profile stand out and let people recognize
              your comments and contributions easily!
            </span>
            <div className="relative w-fit mt-6 rounded-2xl overflow-hidden">
              <Image
                src={avatarUrl || '/images/placeholder.jpg'}
                alt={fullName || ''}
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
              />
              <div
                onClick={() => avatarRef.current?.click()}
                className="absolute top-0 right-0 left-0 bottom-0 z-[1] flex justify-center items-center bg-gray-300/25 opacity-0 hover:opacity-100 transition cursor-pointer"
              >
                <span className="text-2xl">
                  <HiOutlineCamera />
                </span>
              </div>
            </div>
            <input
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, , image/avif, image/gif"
              ref={avatarRef}
            />
          </div>
          <div>
            <h2 className="text-[17px] text-black dark:text-white font-bold mt-10">
              Account Information
            </h2>
            <div className="flex items-center mt-6 bg-[#52586614] dark:bg-[#a8b3cf14] w-full max-w-[360px] rounded-[14px] px-4 border-[1px] border-transparent [&:has(input:is(:focus))]:bg-white dark:[&:has(input:is(:focus))]:bg-transparent [&:has(input:is(:focus,:hover))]:border-[#0e1217] dark:[&:has(input:is(:focus,:hover))]:border-white border-l-[3px] transition duration-75">
              <span className="text-xl mr-2">
                <BiUser />
              </span>
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-xs text-[#525866] mt-1 ">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-[17px] bg-inherit outline-none group"
                />
              </div>
            </div>
            <div
              className={`flex items-center mt-6 bg-[#52586614] dark:bg-[#a8b3cf14] w-full max-w-[360px] rounded-[14px] px-4 border-[1px] border-transparent ${
                usernameExisted
                  ? ''
                  : '[&:has(input:is(:focus))]:bg-white dark:[&:has(input:is(:focus))]:bg-transparent [&:has(input:is(:focus,:hover))]:border-[#0e1217] dark:[&:has(input:is(:focus,:hover))]:border-white'
              } border-l-[3px] transition duration-75 ${
                usernameExisted ? 'border-red-500' : ''
              }`}
            >
              <span className="text-xl mr-2">@</span>
              <div className="flex flex-col">
                <label htmlFor="username" className="text-xs text-[#525866] mt-1 ">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-[17px] bg-inherit outline-none group"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[17px] text-black dark:text-white font-bold mt-10">
              About
            </h2>
            <textarea
              value={bio}
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
              className="h-40 w-full max-w-[360px] px-4 py-2 bg-[#52586614] dark:bg-[a8b3cf14] rounded-[14px] mt-5 border-[1px] border-transparent outline-none focus:bg-white dark:focus:bg-transparent focus:border-[#0e1217] dark:focus:border-white border-l-[3px] transition duration-75"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleSubmit}
            disabled={isChanging}
            className="w-fit px-3 py-2 flex items-center rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md hover:brightness-110 hover:scale-105 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Account
