import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  if (!session && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (session && !session.user.profileComplete && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url))
  }

  if (session && session.user.profileComplete && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/home", req.url))
  }
})

export const config = {
  matcher: ["/home/:path*", "/onboarding", "/secret/:path*"]
}