import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth()
  if (!session?.user) redirect('/')

  return (
    <main className="min-h-screen bg-[#060d1f] text-white">

      {/* Temp sign out bar */}
      <div className="w-full bg-white/5 border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <span className="text-sm text-white/50">
          Signed in as <span className="text-white/80">{session.user.email}</span>
        </span>
        <form action={async () => {
          "use server"
          await signOut({ redirectTo: '/' })
        }}>
          <button
            type="submit"
            className="text-sm text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-3 py-1.5 rounded-lg transition-all"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* Placeholder home content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-53px)]">
        <h1 className="text-3xl font-medium mb-2">Welcome, {session.user.name} 👋</h1>
        <p className="text-white/40 text-sm">Home page coming soon</p>
      </div>

    </main>
  )
}