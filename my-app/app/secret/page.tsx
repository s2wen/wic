import { auth } from "@/auth";
import { redirect } from "next/navigation"

export default async function Secret() {
    const session = await auth();
    if(!session) return redirect('/login')

    return <h1 className="text-2x1 text-green-700">Welcome</h1>
}