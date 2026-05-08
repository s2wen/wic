import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AuthCallback() {
  const session = await auth()

  if (!session?.user) redirect('/')

  if (session.user.profileComplete) {
    redirect('/home')
  } else {
    redirect('/onboarding')
  }
}