import { BsFacebook } from 'react-icons/bs'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { isMobile } from 'react-device-detect'

export const postsPerPage = isMobile ? 4 : 9

export const socialNetworkLinks = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/tuan204.dev',
    icon: BsFacebook,
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/tuan204.dev/',
    icon: FaInstagram,
  },
  {
    title: 'Github',
    link: 'https://github.com/tuan204-dev',
    icon: FaGithub,
  },
]
