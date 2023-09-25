import axios from 'axios'
import { postsPerPage } from '../constants'
import getURL from '../utils/getURL'

export async function getPosts({ page }: { page: number }) {
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

export async function getPostById({ postId }: { postId: string }) {
  try {
    const URL = getURL(`/api/post/${postId}`)
    const { data: post } = await axios.get(`${URL}`)
    return post
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPostsQuantity() {
  try {
    const URL = getURL(`/api/posts/quantity`)
    const { data: quantity } = (await axios.get(`${URL}`)) || 0
    return quantity
  } catch (error) {
    console.log(error)
    return 0
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    const URL = getURL(`/api/user/${id}`)
    const { data: user } = await axios.get(`${URL}`)
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
}) {
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
}) {
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
