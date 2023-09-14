'use client'

import type { Session } from 'next-auth'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { SwapSpinner } from 'react-spinners-kit'
import { useTheme } from 'next-themes'

const Test = () => {
  const { data: session } = useSession()
  const createPost = async () => {
    const randomNum = Math.floor(Math.random() * 100)

    const title = 'Test Post ' + randomNum
    const body = 'This is a test post ' + randomNum
    const rawBody = 'This is a test post ' + randomNum
    const thumbnail = 'https://ionicframework.com/docs/img/demos/thumbnail.svg'

    const { data: newPost } = await axios.post('/api/post', {
      title,
      body,
      rawBody,
      thumbnail,
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
    const postId = '6500a46aebf501711340f940'

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

  const editPost = async () => {
    const postId = '6500a469ebf501711340f93d'
    const title = 'updated title'

    const { data: editedPost } = await axios.put(`/api/post/${postId}/edit`, { title })
    toast.success('Post edited successfully')
    console.log(editedPost)
  }

  const createCommentOnPost = async () => {
    const postId = '6500a469ebf501711340f93d'
    const body = 'This is a test comment 2'

    const { data: newComment } = await axios.post(`/api/comment`, { body, postId })
    toast.success('Comment created successfully')
    console.log(newComment)
  }

  const editComment = async () => {
    const commentId = '6500b0d0ebf501711340f941'
    const body = 'This is an edited comment'

    const { data: editedComment } = await axios.put(`/api/comment/${commentId}/edit`, {
      body,
    })
    toast.success('Comment edited successfully')
    console.log(editedComment)
  }

  const deleteComment = async () => {
    const commentId = '6500b181ebf501711340f944'

    await axios.delete(`/api/comment/${commentId}/delete`)
    toast.success('Comment deleted successfully')
  }

  const replyToComment = async () => {
    const commentId = '6500b180ebf501711340f943'
    const body = 'This is a reply to a comment'

    const { data: newReply } = await axios.post(`/api/comment/${commentId}/reply`, {
      body,
    })
    toast.success('Reply created successfully')
    console.log(newReply)
  }

  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-8 items-center h-screen justify-center">
      <div className="flex gap-6 flex-wrap">
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
        <button
          onClick={editPost}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >
          Edit post
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={createCommentOnPost}
        >
          Comment on post
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={editComment}
        >
          Edit comment
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={deleteComment}
        >
          Delete comment
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
          onClick={replyToComment}
        >
          Reply comment
        </button>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-4 py-2 rounded-lg bg-gray-600 text-white"
        >
          Toggle theme
        </button>
      </div>
    </div>
  )
}

export default Test
