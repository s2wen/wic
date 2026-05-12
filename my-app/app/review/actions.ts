"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function createStudyGroup(data: {
  name: string
  subject: string
  description: string
  location: string
  time: string
  date: Date | null
  spots: number
  color: string
}) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Not authenticated")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) throw new Error("User not found")

  const group = await prisma.studyGroup.create({
    data: {
      name: data.name,
      subject: data.subject,
      location: data.location,
      time: data.time,
      date: data.date,
      spots: data.spots,
      color: data.color,
      members: {
        connect: { id: user.id } // creator is automatically a member
      }
    }
  })

  return group.id
}