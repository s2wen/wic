"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function joinStudyGroup(groupId: string){
    const session = await auth()
    if(!session?.user?.email) throw new Error("not authenticated")
    
    const user = await prisma.user.findUnique({
        where: {email: session.user.email}
    })

    if(!user) throw new Error("user not found")

    const group = await prisma.studyGroup.findUnique({
        where: {id: groupId},
        include: {members: true}
    })
    if(!group) throw new Error("group not found")

    const alreadyMember = group.members.some(m=>m.id===user.id)
    if(alreadyMember) throw new Error("already member!")

    if(group.members.length > group.spots) throw new Error("group full")

    await prisma.studyGroup.update({
        where: {id: groupId},
        data:{
            members:{
                connect:{id: user.id}
            }
        }
    })
}