import axios from 'axios'
import { postsPerPage } from '../constants'
import getURL from '../utils/getURL'
import { Post, User } from '@prisma/client'
import prisma from './prismadb'

export async function getPosts({ page }: { page: number }): Promise<Post[]> {
  try {
    const from = 1 + (page - 1) * postsPerPage
    const take = postsPerPage
    const posts =
      (await prisma.post.findMany({
        where: {
          accepted: true,
          // accepted: true, in production
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: from ? from - 1 : undefined,
        take: take ? take : undefined,
      })) || []

    return posts
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getPostById({ postId }: { postId: string }): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })

    return post
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPostByIdOnClientSide({
  postId,
}: {
  postId: string
}): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post/${postId}`)
    const { data: post } = await axios.get(URL)
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPostsQuantity(): Promise<number> {
  try {
    const postsQuantity = (await prisma.post.count()) || 0
    return postsQuantity
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
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserByIdOnClientSide({
  id,
}: {
  id: string
}): Promise<User | null> {
  try {
    const URL = getURL(`/api/user/${id}`)
    const { data: user } = await axios.get(URL)
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
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getUserByEmail({ email }: { email: string }): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
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
  estimatedTime,
}: {
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
  estimatedTime: string
}): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post`)
    const { data: newPost } = await axios.post(URL, {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
      estimatedTime,
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
  estimatedTime,
}: {
  postId: string
  title: string
  desc: string
  rawContent: string
  thumbnail: string
  htmlContent: string
  estimatedTime: string
}): Promise<Post | null> {
  try {
    const URL = getURL(`/api/post/${postId}/update`)
    const { data: updatedPost } = await axios.put(URL, {
      title,
      desc,
      rawContent,
      thumbnail,
      htmlContent,
      estimatedTime,
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

export async function getMarkedPosts({ userId }: { userId: string }): Promise<Post[]> {
  try {
    const markedPosts = await prisma.post.findMany({
      where: {
        bookmarkedIds: {
          has: userId,
        },
      },
    })

    return markedPosts
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function handleSearchPost({ query }: { query: string }): Promise<Post[]> {
  try {
    const URL = getURL(`/api/search?q=${query}`)
    const { data: posts } = (await axios.get(URL)) || []
    return posts
  } catch (error) {
    console.log(error)
    return []
  }
}
