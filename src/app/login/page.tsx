'use client'

import { useActionState } from 'react'
import { login } from '@/app/auth/actions'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null)
  const searchParams = useSearchParams()
  
  // Menangkap pesan sukses dari halaman Register (jika ada)
  const message = searchParams.get('message')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login Portal
        </h1>

        {/* Tampilkan pesan sukses register jika ada */}
        {message && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded text-sm text-center">
            {message}
          </div>
        )}

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          {/* Pesan Error Login */}
          {state?.error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Memproses...' : 'Login'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  )
}