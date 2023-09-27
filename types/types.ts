interface IUser {
  id: string
  name: string
  bio?: string
  username?: string
  email: string
  image?: string
  coverImage?: string
  profileImage?: string
  createdAt: string
}

interface IPost {
  id: string
  userId: string
  title: string
  desc: string
  thumbnail: string
  accepted: boolean
  rawContent: string
  createdAt: string
}

interface ISidebarItem {
  icon: string
  title: string
  href: string
}