import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import HomepageClient from "./homepageClient"

export default async function homePage(){
    const session = await auth()
    if(!session?.user?.email) redirect("/")

    const dbGroups = await prisma.studyGroup.findMany({
        include:{
            members: true,
        },
        orderBy:{
            date: "asc",
        }
    })

    const groups = dbGroups.map(g => ({
        id: g.id,
        name: g.name,
        subject: g.subject,
        day: g.date ? new Date(g.date).getDate() : 0,
        month: g.date ? new Date(g.date).getMonth() : -1,
        year: g.date ? new Date(g.date).getFullYear() : -1,
        time: g.time ?? "",
        location: g.location,
        spots: g.spots - g.members.length, // remaining spots
        color: g.color,
    }))

    return <HomepageClient groups={groups} />
    

}