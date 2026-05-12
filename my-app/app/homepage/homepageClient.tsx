"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; //ShuWen Wen
import { signIn, signOut } from "next-auth/react"
import Link from "next/link";
import styles from "./homepage.module.css"
import { joinStudyGroup } from "./actions";
import { useRouter } from "next/navigation"


const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

type StudyGroup = {
  id: string        
  name: string
  subject: string
  day: number       
  time: string
  location: string | null
  spots: number
  color: string
}

type User = {
  name: string;
  email: string;
};

// const SAMPLE_GROUPS: StudyGroup[] = [
//   { id:1,  name:"Calc II Study",   subject:"Math",      day:2,  time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
//   { id:2,  name:"Bio 101 Review",  subject:"Biology",   day:2,  time:"5:00 PM", location:"Science Hall",    spots:6, color:"blue"   },
//   { id:3,  name:"CS Algorithms",   subject:"Comp Sci",  day:5,  time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
//   { id:4,  name:"Chem Lab Prep",   subject:"Chemistry", day:8,  time:"4:00 PM", location:"Chem 104",        spots:5, color:"amber"  },
//   { id:5,  name:"History Essay",   subject:"History",   day:10, time:"1:00 PM", location:"Humanities 302",  spots:7, color:"coral"  },
//   { id:6,  name:"Calc II Study",   subject:"Math",      day:12, time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
//   { id:7,  name:"CS Algorithms",   subject:"Comp Sci",  day:15, time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
//   { id:8,  name:"Bio 101 Review",  subject:"Biology",   day:18, time:"5:00 PM", location:"Science Hall",    spots:6, color:"blue"   },
//   { id:9,  name:"Physics Study",   subject:"Physics",   day:20, time:"6:00 PM", location:"Physics 210",     spots:5, color:"amber"  },
//   { id:10, name:"Calc II Study",   subject:"Math",      day:22, time:"3:00 PM", location:"Library Rm 201",  spots:4, color:"teal"   },
//   { id:11, name:"History Essay",   subject:"History",   day:24, time:"1:00 PM", location:"Humanities 302",  spots:7, color:"coral"  },
//   { id:12, name:"CS Algorithms",   subject:"Comp Sci",  day:26, time:"2:00 PM", location:"Tech Lab B",      spots:3, color:"purple" },
// ];

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

export default function homepageClient({groups}: {groups: StudyGroup[]}) {
  const router = useRouter()
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
    ? groups.filter(g => g.day === selectedDay)
    : [];

  // ── Auth helpers ──────────────────────────────────────────────────────────
  // function openAuth(mode: "signin" | "signup", group?: StudyGroup) {
  //   setAuthMode(mode);
  //   if (group) setPendingGroup(group);
  //   setShowAuthModal(true);
  //   setFormName(""); setFormEmail(""); setFormPass("");
  // }

  async function handleJoinClick(group: StudyGroup) {
    if (!user) {
      signIn("google")  
    }

    try{
      await joinStudyGroup(group.id)
      alert(`You've joined "${group.name}"! 🎉`)
      router.refresh()
    } catch (err: unknown){
      if (err instanceof Error) {
        if (err.message === "Already a member") {
          alert("You're already in this group!")
        } else if (err.message === "Group is full") {
          alert("Sorry, this group is full!")
        } else {
          alert("Something went wrong — please try again")
        }
      }
    }
  }

  function handleSignOut() {
    signOut({ callbackUrl: '/' })
    setMenuOpen(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main >
      {/* className="min-h-screen bg-gray-50 px-4 py-8 max-w-5xl mx-auto" */}

      {/* ── Header ── */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <ul className={styles.navLinks}>
            <li className={styles.element}>
              <Link href="/homepage">Home</Link>
            </li>
            <li className={styles.element}>
              <Link href="/leaderboard">LeaderBoard</Link>
            </li>
            <li className={styles.element}>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
          <button className={styles.authButton} onClick={() => signOut({callbackUrl:'/'})}>Sign Out</button>
        </div>
      </nav>

      {/* ── Calendar nav ── */}
      <div className="flex items-center justify-between mb-4 mr-4 ml-4 mt-4">
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
      <div className="grid grid-cols-7 gap-1 mb-1 mr-4 ml-4">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 uppercase tracking-wide py-1">
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ── */}
      <div className="grid grid-cols-7 gap-1 mr-4 ml-4">
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
          const dayGroups  = groups.filter(g => g.day === day);

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
