import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user) redirect('/')
  if (session.user.profileComplete) redirect('/homepage')

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
        pronouns: formData.get("pronouns") as string,
        classes,
        profileComplete: true,
      },
      create: {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        university: formData.get("university") as string,
        major: formData.get("major") as string,
        year: formData.get("year") as string,
        pronouns: formData.get("pronouns") as string,
        classes,
        profileComplete: true,
      }
    })

    redirect('/homepage')
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f7faff',
      fontFamily: 'system-ui, sans-serif',
      color: '#13233a',
    }}>
      {/* Navbar */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e3ebf5',
        padding: '2px',
      }}>
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#13233a' }}>
            Triton<span style={{ color: '#4f7fd9' }}>Study</span>
          </span>
        </div>
      </nav>

      <div style={{
        maxWidth: 560,
        margin: '48px auto',
        padding: '0 24px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 8px' }}>
            Set up your profile
          </h1>
          <p style={{ color: '#66768e', lineHeight: 1.6, margin: 0 }}>
            Tell us about yourself so we can match you with the right study groups.
          </p>
        </div>

        <form action={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Name (pre-filled from Google, read only) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>Name</label>
            <input
              name="name"
              defaultValue={session.user.name ?? ""}
              readOnly
              style={{
                padding: '12px 14px', borderRadius: 12,
                border: '1px solid #dbe6f3', background: '#f7faff',
                fontSize: 15, color: '#66768e',
              }}
            />
          </div>

          {/* Pronouns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>Pronouns</label>
            <select name="pronouns" required style={{
              padding: '12px 14px', borderRadius: 12,
              border: '1px solid #dbe6f3', background: '#ffffff',
              fontSize: 15, color: '#13233a',
            }}>
              <option value="">Select pronouns...</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="He/They">He/They</option>
              <option value="She/They">She/They</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* University */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>University</label>
            <input
              name="university"
              required
              placeholder="e.g. UC San Diego"
              defaultValue="UC San Diego"
              style={{
                padding: '12px 14px', borderRadius: 12,
                border: '1px solid #dbe6f3', background: '#ffffff',
                fontSize: 15, color: '#13233a',
              }}
            />
          </div>

          {/* Major */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>Major</label>
            <input
              name="major"
              required
              placeholder="e.g. Computer Science"
              style={{
                padding: '12px 14px', borderRadius: 12,
                border: '1px solid #dbe6f3', background: '#ffffff',
                fontSize: 15, color: '#13233a',
              }}
            />
          </div>

          {/* Year */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>Year</label>
            <select name="year" required style={{
              padding: '12px 14px', borderRadius: 12,
              border: '1px solid #dbe6f3', background: '#ffffff',
              fontSize: 15, color: '#13233a',
            }}>
              <option value="">Select year...</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* Classes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#66768e' }}>Current Classes</label>
            <input
              name="classes"
              required
              placeholder="e.g. CSE 101, MATH 20C, ECE 35"
              style={{
                padding: '12px 14px', borderRadius: 12,
                border: '1px solid #dbe6f3', background: '#ffffff',
                fontSize: 15, color: '#13233a',
              }}
            />
            <span style={{ fontSize: 12, color: '#66768e' }}>Separate with commas</span>
          </div>

          <button type="submit" style={{
            background: '#4f7fd9',
            color: '#ffffff',
            border: 'none',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 8,
          }}>
            Save & Continue →
          </button>
        </form>
      </div>
    </main>
  )
}