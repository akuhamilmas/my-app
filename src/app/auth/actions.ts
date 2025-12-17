'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// --- 1. REGISTER (SIGNUP) ---
export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan Password wajib diisi.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=Registrasi berhasil! Silakan login.')
}

// --- 2. LOGIN ---
export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email dan Password wajib diisi.' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Login gagal. Periksa email atau password Anda.' }
  }

  redirect('/dashboard')
}

// --- 3. LOGOUT ---
export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}