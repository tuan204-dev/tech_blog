'use client'

import type { Session } from 'next-auth'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const Test = () => {
  const { data: session } = useSession()
  const createPost = async () => {
    const randomNum = Math.floor(Math.random() * 100)

    const title = 'Test Post ' + randomNum
    const body = 'This is a test post ' + randomNum
    const rawBody = 'This is a test post ' + randomNum

    const { data: newPost } = await axios.post('/api/post', {
      title,
      body,
      rawBody,
    })

    toast.success('Post created successfully')

    console.log(newPost)
  }

  const getUserPost = async () => {
    const { data: userPosts } = await axios.get(
      '/api/posts/650055e7c90ee0c8c997711c?from=2&take=5'
    )

    console.log(userPosts)
  }

  const toggleLikePost = async () => {
    const postId = '650038c3c2d2a63862ec3c7a'

    const { data: likedPost } = await axios.put(`/api/post/${postId}/like`)
    console.log(likedPost)
  }

  const deletePost = async () => {
    const postId = '65003779c2d2a63862ec3c6f'

    await axios.delete(`/api/post/${postId}/delete`)
    toast.success('Post deleted successfully')
  }

  const getSession = async () => {
    console.log(session)
  }

  const updateUser = async () => {
    const name = 'updated name'
    const bio = 'updated bio'

    const { data: updatedUser } = await axios.put('/api/currentUser/update', { name })
    console.log(updatedUser)
    toast.success('User updated successfully')
  }

  return (
    <div className="flex flex-col gap-8 items-center h-screen justify-center">
      <div className="flex gap-6">
        <Link href="/login">
          <button className="px-4 py-2 rounded-lg bg-gray-600 text-white">Login</button>
        </Link>
        <Link href="register">
          <button className="px-4 py-2 rounded-lg bg-gray-600 text-white">
            Register
          </button>
        </Link>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={() => signOut()}
        >
          Logout
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={createPost}
        >
          Create post
        </button>
        <button
          onClick={toggleLikePost}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >
          Toggle like post
        </button>
        <button
          onClick={() => getUserPost()}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >{`Get user's post`}</button>
        <button
          onClick={deletePost}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >
          Delete post
        </button>
        <button
          onClick={getSession}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >
          Get client session
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={updateUser}
        >
          Update user info
        </button>
      </div>
    </div>
  )
}

export default Test
