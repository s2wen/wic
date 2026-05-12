import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ReviewContent from "./reviewClient"

export default async function ReviewPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/")

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      name: true,
      pronouns: true,
      email: true,
      major: true,
      year: true,
    }
  })

  if (!dbUser) redirect("/")

  return <ReviewContent user={dbUser} />
}