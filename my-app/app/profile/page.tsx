import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileClient from "./profileClient"

export default async function ProfilePage(){
  const session = await auth();
  if(!session) redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: {email: session.user.email!},
  })

  if(!dbUser) redirect("/");

  return <ProfileClient dbUser={dbUser}/>
}