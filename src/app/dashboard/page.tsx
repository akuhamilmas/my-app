import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/auth/actions'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Ambil data user
  const { data: { user } } = await supabase.auth.getUser()

  // Ambil data pengumuman dari database
  const { data: announcements } = await supabase.from('announcements').select()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Karyawan</h1>
            <p className="text-gray-600">Login sebagai: {user?.email}</p>
          </div>
          <form action={signout}>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Logout
            </button>
          </form>
        </div>

        <h2 className="text-xl font-bold text-black mb-4">Pengumuman Kantor</h2>
        <div className="grid gap-4">
          {announcements?.map((item) => (
            <div key={item.id} className="border p-4 rounded hover:bg-gray-50">
              <h3 className="font-bold text-blue-600">{item.title}</h3>
              <p className="text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}