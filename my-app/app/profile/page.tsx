import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileClient from "./profileClient"

export default async function ProfilePage(){
  const session = await auth();
  if(!session) redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: {email: session.user.email!},
    include: {
      StudyGroup: true,
    }
  })

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const recentGroups = dbUser!.StudyGroup.filter(g =>
    g.createdAt > thirtyDaysAgo
  ).length

  // each group = 20hp, max 100, min 0
  const health = Math.min(100, Math.max(0, recentGroups * 20))


  if(!dbUser) redirect("/");

  return <ProfileClient dbUser={dbUser} health={health}/>
}