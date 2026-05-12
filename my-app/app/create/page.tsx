import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import CreateStudyGroup from "./createClient"

export default async function CreatePage() {
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
      classes: true,
    }
  })

  if (!dbUser) redirect("/")

  return <CreateStudyGroup user={dbUser} />
}