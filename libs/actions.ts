import axios from 'axios'
import { postsPerPage } from '../constants'
import getURL from '../utils/getURL'
import { Post, User } from '@prisma/client'

export async function getPosts({ page }: { page: number }): Promise<Post[]> {
  try {
    const from = 1 + (page - 1) * postsPerPage
    const take = postsPerPage
    const URL = getURL(`/api/posts?from=${from}&take=${take}`)
    const { data: posts = [] } = await axios.get(`${URL}`)
    return posts
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getPostById({ postId }: { postId: string }): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post/${postId}`)
    const { data: post } = await axios.get(`${URL}`)
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPostsQuantity(): Promise<number> {
  try {
    const URL = getURL(`/api/posts/quantity`)
    const { data: quantity } = (await axios.get(`${URL}`)) || 0
    return quantity
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const URL = getURL('/api/currentUser')
    const { data: currentUser } = await axios.get(URL)

    return currentUser
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserById({ id }: { id: string }): Promise<User | null> {
  try {
    const URL = getURL(`/api/user/${id}`)
    const { data: user } = await axios.get(`${URL}`)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserByUsername({
  username,
}: {
  username: string
}): Promise<User | null> {
  try {
    const { data: user } = await axios.get(`/api/user/find/username/${username}`)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserByEmail({ email }: { email: string }): Promise<User | null> {
  try {
    const { data: user } = await axios.get(`/api/user/find/email/${email}`)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createPost({
  title,
  desc,
  rawContent,
  thumbnail,
  htmlContent,
}: {
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
}): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post`)
    const { data: newPost } = await axios.post(URL, {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
    })
    return newPost
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updatePost({
  postId,
  title,
  desc,
  rawContent,
  thumbnail,
  htmlContent,
}: {
  postId: string
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
}): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post/${postId}/update`)
    const { data: updatedPost } = await axios.put(URL, {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
    })
    return updatedPost
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createAccountWithCredentials({
  email,
  password,
  name,
  username,
}: {
  email: string
  password: string
  name: string
  username: string
}): Promise<User | null> {
  try {
    const URL = getURL('/api/register')
    const { data: newAccount } = await axios.post(URL, {
      email,
      password,
      name,
      username,
    })
    return newAccount
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updateCurrentUser({
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

export async function toggleMarkPost({ postId }: { postId: string }) {
  try {
    const URL = getURL(`/api/post/${postId}/mark`)
    const { data: updatedUser } = await axios.put(URL)
    return updatedUser
  } catch (error) {
    console.log(error)
  }
}
