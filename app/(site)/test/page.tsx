'use client'

import useCurrentUser from '@/app/hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import axios from 'axios'
import Link from 'next/link'

const Test = () => {
  // const { data: session } = useSession()

  // useEffect(() => {
  //   const handler = async () => {
  //     await axios.get('/api/currentUser')
  //   }
  //   handler()
  // }, [])

  const { data , isLoading} = useCurrentUser()

  console.log(data, isLoading)

  return (
    <>
      {/* <div>Session:{JSON.stringify(session)}</div> */}
      <button onClick={() => signOut()}>Sign out</button>
      <Link href="/login">Login</Link>
    </>
  )
}

export default Test
