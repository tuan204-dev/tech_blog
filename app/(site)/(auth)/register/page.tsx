'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  createAccountWithCredentials,
  getUserByEmail,
  getUserByUsername,
} from '@/libs/actions'

interface Errors {
  username?: boolean
  email?: boolean
  password?: boolean
}

const Register: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errors, setErrors] = useState<Errors>({})

  // -------------------------------------------------
  const { data: session } = useSession()
  const router = useRouter()
  if (session) router.push('/')
  // -------------------------------------------------
  const usernameFormat = /^[A-Za-z][A-Za-z0-9_]{4,29}$/
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const isValid = useMemo(() => {
    return (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      username &&
      email &&
      password &&
      fullName
    )
  }, [errors.email, errors.username, errors.password, fullName])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (email) {
        if (!emailFormat.test(email)) {
          return setErrors({ ...errors, email: true })
        }
        ;(async () => {
          const user = await getUserByEmail({ email })
          if (user) {
            setErrors({ ...errors, email: true })
          } else {
            setErrors({ ...errors, email: false })
          }
        })()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [email])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (username) {
        ;(async () => {
          if (!usernameFormat.test(username)) {
            return setErrors({ ...errors, username: true })
          }
          const user = await getUserByUsername({ username })
          if (user) {
            setErrors({ ...errors, username: true })
          } else {
            setErrors({ ...errors, username: false })
          }
        })()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [username])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (password) {
        if (password.length < 6) {
          return setErrors({ ...errors, password: true })
        } else {
          setErrors({ ...errors, password: false })
        }
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [password])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault()
        setLoading(true)
        await createAccountWithCredentials({
          email,
          password,
          username,
          name: fullName,
        })
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/',
          redirect: false,
        })
        toast.success('Account created successfully')
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong!')
      }
    },
    [email, password, username, fullName]
  )

  return (
    <div className="h-screen min-h-[800px] bg-white dark:bg-gray-900">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto">
          <Image src="/logo.svg" alt="logo" width={60} height={60} className="" />
        </div>
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Register your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-sm mb-24">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium leading-6 text-gray-900 dark:text-white ${
                  errors.username ? 'text-danger' : ''
                }`}
              >
                Username
              </label>

              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder="Enter your username"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432] ${
                    errors.username ? 'text-danger' : ''
                  }`}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium leading-6 text-gray-900 dark:text-white ${
                  errors.email ? 'text-danger' : ''
                }`}
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432] ${
                    errors.email ? 'text-danger' : ''
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium leading-6 text-gray-900 dark:text-white ${
                    errors.password ? 'text-danger' : ''
                  }`}
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                  placeholder="Enter your password"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432] ${
                    errors.password ? 'text-danger' : ''
                  }`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-100">
            You already have an account?{'  '}
            <Link
              href="/login"
              className="hover:underline font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
