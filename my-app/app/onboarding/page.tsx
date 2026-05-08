import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user) redirect('/')
  if (session.user.profileComplete) redirect('/home')

  async function saveProfile(formData: FormData) {
    "use server"
    const session = await auth()
    if (!session?.user?.email) return

    const classes = (formData.get("classes") as string)
      .split(",")
      .map(c => c.trim())
      .filter(Boolean)

    await prisma.user.upsert({
    where: { email: session.user.email },
    update: {
        university: formData.get("university") as string,
        major: formData.get("major") as string,
        year: formData.get("year") as string,
        classes,
        profileComplete: true,
    },
    create: {
        email: session.user.email,
        university: formData.get("university") as string,
        major: formData.get("major") as string,
        year: formData.get("year") as string,
        classes,
        profileComplete: true,
    }
    })

    redirect('/home')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Set Up Your Profile</h1>
      <p className="text-gray-500 mb-6">Tell us a bit about yourself</p>
      <form action={saveProfile} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input name="university" required
            className="w-full border rounded p-2"
            placeholder="e.g. UC San Diego" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Major</label>
          <input name="major" required
            className="w-full border rounded p-2"
            placeholder="e.g. Computer Science" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <select name="year" required className="w-full border rounded p-2">
            <option value="">Select year...</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Current Classes</label>
          <input name="classes" required
            className="w-full border rounded p-2"
            placeholder="e.g. CSE 101, MATH 20C, ECE 35" />
          <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
        </div>

        <button type="submit"
          className="bg-blue-500 text-white rounded p-2 font-medium hover:bg-blue-600">
          Save & Continue
        </button>
      </form>
    </div>
  )
}