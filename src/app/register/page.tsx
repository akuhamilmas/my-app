'use client'

import { useActionState } from 'react'
import { signup } from '@/app/auth/actions'

export default function RegisterPage() {
  // useActionState menghubungkan form dengan server action 'signup'
  // null adalah nilai awal state
  const [state, action, isPending] = useActionState(signup, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register Employee
        </h1>

        <form action={action} className="space-y-4">
          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          {/* Pesan Error (Jika ada) */}
          {state?.error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center">
              {state.error}
            </div>
          )}

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Mendaftarkan...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  )
}