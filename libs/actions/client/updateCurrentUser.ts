import axios from 'axios'

export default async function updateCurrentUser({
  avatarUrl,
  fullName,
  username,
  bio,
}: {
  avatarUrl: string
  fullName: string
  username: string
  bio: string
}) {
  try {
    await axios.put('/api/currentUser/update', {
      name: fullName,
      username,
      bio,
      profileImage: avatarUrl,
    })
  } catch (error) {
    console.log(error)
  }
}
