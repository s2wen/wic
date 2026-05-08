import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }){
      if(account?.provider === "google") {
        const existing = await prisma.user.findUnique({
          where: {email: user.email!}
        })

        if(!existing){
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              googleId: account.providerAccountId,
            }
          })
        }
      }
      return true
    },

    async session({ session }){
      const dbUser = await prisma.user.findUnique({
        where: {email: session.user.email!}
      })
      session.user.profileComplete = dbUser?.profileComplete ?? false
      session.user.id = dbUser?.id!
      return session
    }
  }
})