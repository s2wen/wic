
import { auth, signIn, signOut } from "@/auth"
import { redirect } from "next/navigation"
 
export default async function SignIn() {
    const session = await auth();
    console.log(session)
    const user = session?.user

    //if signed in, redirect to profile page. else sign in via google
    return user ?
    (
    <>
        <h1 className="text-2x1">Welcome {user.name}</h1>
        return redirect('/secret')
        {/* <form 
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button className="p-2 border-2 bg-blue-400">
                Sign Out</button>
        </form> */}
    </>
    )
    :
    (
    <>
        <h1 className="text-x1">Not Authenticated. Please Sign In.</h1>
        <form
            action={async () =>{
                "use server";
                await signIn("google", {redirectTo: '/secret'});
            }}
        >
            <button className="p-2 border-2 bg-blue-400">Sign In</button>
        </form>
    </>
//     )
//   return (
//     <form
//       action={async () => {
//         "use server"
//         await signIn("google")
//       }}
//     >
//       <button type="submit">Signin with Google</button>
//     </form>
  )
} 