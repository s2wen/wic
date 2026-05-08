"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; //ShuWen Wen
import { signIn, signOut } from "next-auth/react"

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

type StudyGroup = {
  id: number;
  name: string;
  subject: string;
  day: number;
  time: string;
  location: string;
  spots: number;
  color: string;
};

type User = {
  name: string;
  email: string;
};

const SAMPLE_GROUPS: StudyGroup[] = [
  { id:1,  name:"Calc II Study",   subject:"Math",      day:2,  time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
  { id:2,  name:"Bio 101 Review",  subject:"Biology",   day:2,  time:"5:00 PM", location:"Science Hall",    spots:6, color:"blue"   },
  { id:3,  name:"CS Algorithms",   subject:"Comp Sci",  day:5,  time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
  { id:4,  name:"Chem Lab Prep",   subject:"Chemistry", day:8,  time:"4:00 PM", location:"Chem 104",        spots:5, color:"amber"  },
  { id:5,  name:"History Essay",   subject:"History",   day:10, time:"1:00 PM", location:"Humanities 302",  spots:7, color:"coral"  },
  { id:6,  name:"Calc II Study",   subject:"Math",      day:12, time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
  { id:7,  name:"CS Algorithms",   subject:"Comp Sci",  day:15, time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
  { id:8,  name:"Bio 101 Review",  subject:"Biology",   day:18, time:"5:00 PM", location:"Science Hall",    spots:6, color:"blue"   },
  { id:9,  name:"Physics Study",   subject:"Physics",   day:20, time:"6:00 PM", location:"Physics 210",     spots:5, color:"amber"  },
  { id:10, name:"Calc II Study",   subject:"Math",      day:22, time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
  { id:11, name:"History Essay",   subject:"History",   day:24, time:"1:00 PM", location:"Humanities 302",  spots:7, color:"coral"  },
  { id:12, name:"CS Algorithms",   subject:"Comp Sci",  day:26, time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
];

const PILL_STYLES: Record<string, string> = {
  teal:   "bg-teal-100   text-teal-800",
  blue:   "bg-blue-100   text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  amber:  "bg-amber-100  text-amber-800",
  coral:  "bg-orange-100 text-orange-800",
};

const CARD_ACCENT: Record<string, string> = {
  teal:   "border-l-teal-400",
  blue:   "border-l-blue-400",
  purple: "border-l-purple-400",
  amber:  "border-l-amber-400",
  coral:  "border-l-orange-400",
};

export default function HomePage() {
  const today = new Date();
  const [year, setYear]               = useState(today.getFullYear());
  const [month, setMonth]             = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const { user } = useAuth(); //ShuWen Wen

  // Hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Calendar helpers ──────────────────────────────────────────────────────
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }

  const selectedGroups = selectedDay
    ? SAMPLE_GROUPS.filter(g => g.day === selectedDay)
    : [];

  // ── Auth helpers ──────────────────────────────────────────────────────────
  // function openAuth(mode: "signin" | "signup", group?: StudyGroup) {
  //   setAuthMode(mode);
  //   if (group) setPendingGroup(group);
  //   setShowAuthModal(true);
  //   setFormName(""); setFormEmail(""); setFormPass("");
  // }

  function handleJoinClick(group: StudyGroup) {
    if (user) {
      alert(`You've joined "${group.name}"! 🎉`)
    } else {
      signIn("google")  // kicks off your real Google OAuth
    }
  }

  function handleSignOut() {
    signOut({ callbackUrl: '/' })
    setMenuOpen(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 max-w-5xl mx-auto">

      {/* ── Header ── */}
      <header className="flex items-center justify-between mb-8">

        {/* Left side */}
        <div className="flex items-center gap-3">

          {/* Hamburger — only shown when logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="flex flex-col justify-center gap-1 p-2 rounded-lg hover:bg-gray-100 border border-gray-200"
                aria-label="Open menu"
              >
                <span className="block w-5 h-0.5 bg-gray-600" />
                <span className="block w-5 h-0.5 bg-gray-600" />
                <span className="block w-5 h-0.5 bg-gray-600" />
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute top-12 left-0 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    {[
                      { emoji: "👤", label: "Profile" },
                      { emoji: "⚙️", label: "Preferences" },
                      { emoji: "📚", label: "My Study Groups" },
                      { emoji: "🔔", label: "Notifications" },
                      { emoji: "❓", label: "Help & Support" },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => { alert(`${item.label} page coming soon!`); setMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <span className="text-base">{item.emoji}</span>
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <span className="text-base">🚪</span>
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <h1 className="text-xl font-medium text-gray-900">
            Study Buddy <span className="text-teal-600">Finder</span>
          </h1>
        </div>

        {/* Right side */}
        {user ? (
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-medium text-gray-800">{user.name}</span>!
          </p>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="text-sm bg-teal-600 text-white rounded-lg px-4 py-1.5 hover:bg-teal-700"
          >
            Sign in with Google
          </button>
        )}
      </header>

      {/* ── Calendar nav ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
            &#8249;
          </button>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100">
            &#8250;
          </button>
        </div>
      </div>

      {/* ── Day labels ── */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[80px] rounded-lg bg-gray-100" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
          const isSelected = selectedDay === day;
          const dayGroups  = SAMPLE_GROUPS.filter(g => g.day === day);

          return (
            <div
              key={day}
              onClick={() => dayGroups.length > 0 && setSelectedDay(day)}
              className={[
                "min-h-[80px] rounded-lg border p-1.5 transition-colors",
                isSelected  ? "border-teal-500 bg-teal-50"
                : isToday   ? "border-teal-400 bg-white"
                :               "border-gray-200 bg-white",
                dayGroups.length > 0 ? "cursor-pointer hover:border-teal-300" : "",
              ].join(" ")}
            >
              <p className={`text-xs font-medium mb-1 ${isToday ? "text-teal-600" : "text-gray-500"}`}>
                {day}
              </p>
              {dayGroups.map(g => (
                <div key={g.id} className={`text-[10px] px-1.5 py-0.5 rounded-full mb-0.5 truncate ${PILL_STYLES[g.color]}`}>
                  {g.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <div className="mt-6 border border-gray-200 rounded-xl bg-white p-5">
        {selectedDay && selectedGroups.length > 0 ? (
          <>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Study groups on {MONTHS[month]} {selectedDay}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedGroups.map(g => (
                <div key={g.id} className={`border border-l-4 ${CARD_ACCENT[g.color]} border-gray-200 rounded-lg p-3 bg-gray-50`}>
                  <p className="text-sm font-medium text-gray-900">{g.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{g.time} &middot; {g.location}</p>
                  <p className="text-xs text-gray-400 mb-3">{g.spots} spots left</p>
                  <button
                    onClick={() => handleJoinClick(g)}
                    className="w-full text-xs bg-teal-600 text-white rounded-lg py-1.5 hover:bg-teal-700"
                  >
                    join group &rarr;
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 text-center py-6">
            Click a date to see available study groups
          </p>
        )}
      </div>
    </main>
  );
}
