import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const session = await auth()

  if (session?.user) {
    // Already logged in, send to home
    if (session.user.profileComplete) {
      redirect('/home')
    } else {
      redirect('/onboarding')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="text-gray-500">Sign in to get started</p>
      <form
        action={async () => {
          "use server"
          await signIn("google", { redirectTo: '/auth/callback' })
        }}
      >
        <button className="p-2 px-4 border-2 bg-blue-400 rounded hover:bg-blue-500">
          Sign in with Google
        </button>
      </form>
    </div>
  )
}