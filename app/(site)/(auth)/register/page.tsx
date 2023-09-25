'use client'

import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Register: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()

  const router = useRouter()

  if (session) router.push('/')

  const handlerSubmit = useCallback(
    async (e: any) => {
      e.preventDefault()
      setLoading(true)
      const email = emailRef?.current?.value.trim()
      const password = passwordRef?.current?.value.trim()
      const name = nameRef?.current?.value.trim()

      try {
        await axios.post('/api/register', {
          email,
          password,
          name,
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
        toast.error('Something went wrong')
      }
    },
    [emailRef, passwordRef, nameRef]
  )

  return (
    <div className="h-screen min-h-[800px] bg-white dark:bg-gray-900">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Register your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-sm mb-24">
          <form className="space-y-6" action="#" onSubmit={handlerSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  ref={nameRef}
                  placeholder="Enter your name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  placeholder="Enter your email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
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
                  required
                  ref={passwordRef}
                  placeholder="Enter your password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#343a47] placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 dark:focus:ring-indigo-500 text-sm leading-6 px-2 dark:bg-[#1d2432]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
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
