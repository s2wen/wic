import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"

export default async function LandingPage() {
  const session = await auth()

  if (session?.user) {
    if (session.user.profileComplete) redirect('/home')
    else redirect('/onboarding')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060d1f] text-white">

      {/* Animated ocean background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d1f] via-[#0a2240] to-[#0d3b6e]" />

        {/* Stars */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Wave SVGs at bottom */}
      <div className="fixed bottom-0 left-0 w-full z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-24 opacity-40">
          <path fill="#1a5276" d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-6 pb-24">

        {/* Nav */}
        <nav className="w-full max-w-4xl flex justify-between items-center pt-6 pb-4">
          <div className="text-lg font-medium tracking-tight">
            Triton<span className="text-[#5dade2]">Study</span>
          </div>
          <span className="text-xs text-white/30 uppercase tracking-widest">UC San Diego</span>
        </nav>

        {/* Floating King Triton */}
        <div className="mt-6 mb-2" style={{ animation: 'float 4s ease-in-out infinite' }}>
          <svg width="150" height="190" viewBox="0 0 150 190" xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(93,173,226,0.5))' }}>
            {/* Glow */}
            <ellipse cx="75" cy="172" rx="45" ry="12" fill="#5dade2" opacity="0.15"/>
            {/* Tail fins */}
            <path d="M55 140 Q45 165 35 175 Q55 170 65 155" fill="#0d47a1" stroke="#5dade2" strokeWidth="1"/>
            <path d="M95 140 Q105 165 115 175 Q95 170 85 155" fill="#0d47a1" stroke="#5dade2" strokeWidth="1"/>
            {/* Body */}
            <ellipse cx="75" cy="110" rx="25" ry="32" fill="#1565c0" stroke="#5dade2" strokeWidth="1.5"/>
            {/* Scale pattern */}
            <ellipse cx="75" cy="108" rx="18" ry="22" fill="#1976d2" opacity="0.5"/>
            {/* Arms */}
            <path d="M50 100 Q35 92 28 105 Q35 115 50 110" fill="#1565c0" stroke="#5dade2" strokeWidth="1"/>
            <path d="M100 100 Q115 92 122 105 Q115 115 100 110" fill="#1565c0" stroke="#5dade2" strokeWidth="1"/>
            {/* Trident */}
            <line x1="122" y1="100" x2="136" y2="72" stroke="#ffa726" strokeWidth="3" strokeLinecap="round"/>
            <path d="M136 72 L140 62 M136 72 L132 62 M136 72 L136 60" stroke="#ffa726" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <circle cx="136" cy="72" r="2.5" fill="#ffd54f"/>
            {/* Head */}
            <circle cx="75" cy="68" r="22" fill="#2196f3" stroke="#5dade2" strokeWidth="1.5"/>
            {/* Crown/hair */}
            <ellipse cx="75" cy="50" rx="14" ry="8" fill="#1565c0"/>
            <path d="M64 48 L61 35 L67 46" fill="#1565c0" stroke="#5dade2" strokeWidth="0.5"/>
            <path d="M75 46 L75 32 L77 44" fill="#1565c0" stroke="#5dade2" strokeWidth="0.5"/>
            <path d="M86 48 L89 35 L83 46" fill="#1565c0" stroke="#5dade2" strokeWidth="0.5"/>
            {/* Beard */}
            <path d="M65 80 Q70 88 75 86 Q80 88 85 80" stroke="#1565c0" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Eyes */}
            <circle cx="68" cy="64" r="4.5" fill="white"/>
            <circle cx="82" cy="64" r="4.5" fill="white"/>
            <circle cx="69" cy="65" r="2.5" fill="#0d1b2a"/>
            <circle cx="83" cy="65" r="2.5" fill="#0d1b2a"/>
            <circle cx="70" cy="64" r="1" fill="white"/>
            <circle cx="84" cy="64" r="1" fill="white"/>
            {/* Smile */}
            <path d="M69 74 Q75 79 81 74" stroke="#1565c0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Health bar */}
        <div className="flex flex-col items-center gap-1 mb-6">
          <span className="text-[11px] uppercase tracking-widest text-white/40">Triton's study energy</span>
          <div className="w-48 h-2.5 bg-white/10 rounded-full border border-white/10 overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-green-500 to-green-300 rounded-full"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}/>
          </div>
          <span className="text-[11px] text-green-400 font-medium">72% — holding on!</span>
        </div>

        {/* Hero text */}
        <div className="text-center max-w-2xl mb-6">
          <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-4 tracking-tight">
            Find your study crew<br/>
            at <span className="text-[#5dade2]">UC San Diego</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Match with classmates by course, form study groups, and keep King Triton alive — 
            he loses energy every day you don't study.
          </p>

          <form action={async () => {
            "use server"
            await signIn("google", { redirectTo: '/auth/callback' })
          }}>
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-[#5dade2] hover:bg-[#3498db] text-[#060d1f] font-medium px-8 py-4 rounded-full text-base transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(93,173,226,0.5)]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-5 py-3.5 mb-8 max-w-lg">
          <span className="text-xl mt-0.5">⚠️</span>
          <p className="text-sm text-white/70 leading-relaxed">
            <span className="text-red-400 font-medium">Warning:</span> King Triton loses health every day 
            you skip studying. Log your sessions to keep him alive — or face the consequences at finals week.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl">
          {[
            { icon: '🔍', title: 'Find study groups', desc: 'Browse by class, major, or time' },
            { icon: '📚', title: 'Match by class', desc: 'Auto-connect with classmates' },
            { icon: '🔱', title: 'Keep Triton alive', desc: 'Log sessions or watch him suffer' },
            { icon: '📅', title: 'Schedule sessions', desc: 'Coordinate with your group' },
          ].map((f) => (
            <div key={f.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all hover:-translate-y-1">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-medium text-white mb-1">{f.title}</div>
              <div className="text-xs text-white/45 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-16px) rotate(1deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
  )
}