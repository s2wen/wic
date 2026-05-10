import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  console.log("middleware hit:", pathname)
  console.log("session:", session)
  console.log("profileComplete:", session?.user?.profileComplete)

  if (!session && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (session && !session.user.profileComplete && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url))
  }

  if (session && session.user.profileComplete && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/homepage", req.url))
  }
})

export const config = {
  matcher: ["/home/:path*", "/onboarding", "/secret/:path*", "/homepage/:path*", "/confirmation", "/review", "/profile/:path*"]
}