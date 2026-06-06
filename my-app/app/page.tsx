import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"

export default async function LandingPage() {
  const session = await auth()

  if (session?.user) {
    if (session.user.profileComplete) redirect('/homepage')
    else redirect('/onboarding')
  }

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      background: '#f7faff',
      color: '#13233a',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#ffffff',
        borderBottom: '1px solid #e3ebf5',
        boxShadow: '0 2px 2px rgba(79,127,217,0.05)',
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
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px', color: '#13233a' }}>
            Triton<span style={{ color: '#4f7fd9' }}>Study</span>
          </span>
          <span style={{ fontSize: 13, color: '#66768e', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            UC San Diego
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '64px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 24,
      }}>

        {/* Floating Triton image */}
        <div style={{ animation: 'float 4s ease-in-out infinite' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/clipart4680483.png"
            alt="King Triton UCSD mascot"
            style={{ width: 180, height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Health bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#66768e' }}>
            Triton's study energy
          </span>
          <div style={{
            width: 200, height: 10,
            background: 'rgba(79,127,217,0.1)',
            borderRadius: 5,
            border: '1px solid rgba(79,127,217,0.2)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: '72%',
              background: '#4f7fd9',
              borderRadius: 5,
            }}/>
          </div>
          <span style={{ fontSize: 11, color: '#4f7fd9', fontWeight: 700 }}>72% — holding on!</span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: 0,
          maxWidth: 640,
        }}>
          Find your study crew at{' '}
          <span style={{ color: '#4f7fd9' }}>UC San Diego</span>
        </h1>

        <p style={{
          fontSize: 17,
          color: '#66768e',
          lineHeight: 1.7,
          maxWidth: 520,
          margin: 0,
        }}>
          Match with classmates by course, form study groups, and keep King Triton alive —
          he loses energy every day you skip studying.
        </p>

        {/* Sign in button */}
        <form action={async () => {
          "use server"
          await signIn("google", { redirectTo: '/auth/callback' })
        }}>
          <button type="submit" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#4f7fd9',
            color: '#ffffff',
            border: 'none',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" fillOpacity=".9" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z"/>
              <path fill="#fff" fillOpacity=".9" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#fff" fillOpacity=".9" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#fff" fillOpacity=".9" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Sign in with Google
          </button>
        </form>

        {/* Warning banner */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          background: 'rgba(79,127,217,0.06)',
          border: '1px solid rgba(79,127,217,0.15)',
          borderRadius: 16,
          padding: '14px 20px',
          maxWidth: 500,
          textAlign: 'left',
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: 13, color: '#66768e', lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: '#3f6bc0', fontWeight: 700 }}>Warning:</span> King Triton loses health
            every day you skip studying. Log your sessions to keep him alive.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '0 24px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        width: '100%',
      }}>
        {[
          { icon: '🔍', title: 'Find study groups', desc: 'Browse by class, major, or time' },
          { icon: '📚', title: 'Match by class', desc: 'Auto-connect with classmates' },
          { icon: '🔱', title: 'Keep Triton alive', desc: 'Log sessions or watch him suffer' },
          { icon: '📅', title: 'Schedule sessions', desc: 'Coordinate with your group' },
        ].map(f => (
          <div key={f.title} style={{
            background: '#ffffff',
            border: '1px solid #dbe6f3',
            borderRadius: 20,
            padding: '20px 24px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(79,127,217,0.06)',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#13233a', marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: '#66768e', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-16px) rotate(1deg); }
        }
      `}</style>
    </main>
  )
}