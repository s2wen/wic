"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function updateProfile(data: {
  name: string
  major: string
  year: string
}) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      major: data.major,
      year: data.year,
    }
  })
}