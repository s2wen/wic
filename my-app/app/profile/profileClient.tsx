"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {signOut} from "next-auth/react";
import styles from "./profile_page.module.css";
import { updateProfile } from "./actions"


export type Course = { name: string; section?: string; professor?: string };

type StudySession = {
  name: string;
  course: string;
  time: string;
  date?: string;
  status: string;
};
type StudyHistoryItem = { groupName: string; course: string; meetings: number };

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  major?: string;
  year?: string;
  courses: Course[];
  sessions: StudySession[];
  history: StudyHistoryItem[];
};

const initialUser: User = {
  username: "@amandatsai",
  firstName: "Amanda",
  lastName: "Tsai",
  email: "a7tsai@ucsd.edu",
  major: "Computer Engineering",
  year: "1st",
  courses: [
    { name: "CSE 30", section: "A00", professor: "Bryan Chin" },
    { name: "Math 20D", section: "B00", professor: "R. Dixit" },
  ],
  sessions: [
    {
      name: "Debug Lab",
      course: "CSE 30",
      time: "Tue 7pm",
      date: "2026-05-05",
      status: "Current",
    },
  ],
  history: [{ groupName: "Study Group A", course: "CSE 12", meetings: 6 }],
};

export default function Profile({ dbUser, health }: { dbUser: {
  name: string | null
  email: string
  major: string | null
  year: string | null
  classes: string[]
  StudyGroup: {
    id: string
    name: string
    subject: string
    time: string | null
    date: Date | null
    location: string | null
    color: string
  }[]
},
  health: number
}) {
  const [userState, setUserState] = useState<User>({
    username: "@" + (dbUser.name?.toLowerCase().replace(" ", "") ?? "user"),
    firstName: dbUser.name?.split(" ")[0] ?? "",
    lastName: dbUser.name?.split(" ")[1] ?? "",
    email: dbUser.email,
    major: dbUser.major ?? "",
    year: dbUser.year ?? "",
    courses: dbUser.classes.map(c => ({ name: c })),
    sessions: dbUser.StudyGroup.map(g => ({
      name: g.name,
      course: g.subject,
      time: g.time ?? "",
      date: g.date?.toISOString().split("T")[0],
      status: "Current",
    })),
    history: (dbUser.StudyGroup ?? []).map(g => ({
      groupName: g.name,
      course: g.subject,
      meetings: 1,
    })),
  })

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [courseSection, setCourseSection] = useState("");
  const [courseProfessor, setCourseProfessor] = useState("");

  const [editValues, setEditValues] = useState({
    firstName: userState.firstName,
    lastName: userState.lastName,
    year: userState.year || "",
    major: userState.major || "",
  });

  // Calendar attendance state (ISO date strings: YYYY-MM-DD)
  const [attendedDates, setAttendedDates] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("profile-calendar-attendance");
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  function TritonHealth({ health }: { health: number }) {
  const getStatus = () => {
    if (health >= 80) return { message: "Thriving! Keep studying! 💪", color: "#22c55e" }
    if (health >= 60) return { message: "Doing okay, keep it up!", color: "#4f7fd9" }
    if (health >= 40) return { message: "Getting tired... join a group!", color: "#f59e0b" }
    if (health >= 20) return { message: "Struggling badly... please study!", color: "#f97316" }
    return { message: "Critical! Triton needs you! 🆘", color: "#ef4444" }
  }

  const { message, color } = getStatus()

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #dbe6f3',
      borderRadius: 20,
      padding: '22px',
      boxShadow: '0 2px 12px rgba(79,127,217,0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#66768e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        King Triton
      </div>

      {/* Floating Triton */}
      <div style={{ animation: 'float 4s ease-in-out infinite' }}>
        <img
          src="/clipart4680483.png"
          alt="King Triton"
          style={{
            width: 100,
            height: 'auto',
            objectFit: 'contain',
            filter: health < 20
              ? 'grayscale(80%) brightness(0.7)'
              : health < 40
              ? 'grayscale(40%) brightness(0.85)'
              : 'none',
            transition: 'filter 0.5s ease',
          }}
        />
      </div>

      {/* Health bar */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#66768e' }}>Health</span>
          <span style={{ fontSize: 12, fontWeight: 800, color }}>{health}%</span>
        </div>
        <div style={{
          width: '100%', height: 10,
          background: 'rgba(79,127,217,0.1)',
          borderRadius: 5,
          border: '1px solid rgba(79,127,217,0.15)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${health}%`,
            background: color,
            borderRadius: 5,
            transition: 'width 0.8s ease, background 0.5s ease',
          }}/>
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#66768e', margin: 0, lineHeight: 1.5 }}>
        {message}
      </p>

      <p style={{ fontSize: 11, color: '#9bb8ec', margin: 0 }}>
        Based on study groups joined in the last 30 days
      </p>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
      `}</style>
    </div>
  )
}

  function formatISO(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatMonthLabel(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function isValidISODate(value?: string) {
    if (!value) return false;
    const parts = value.split("-").map((part) => Number(part));
    if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
      return false;
    }
    const [year, month, day] = parts;
    const parsed = new Date(year, month - 1, day);
    return (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    );
  }

  function sessionMarkedDates(sessions: StudySession[]) {
    return sessions
      .filter((session) => isValidISODate(session.date))
      .map((session) => session.date as string);
  }

  const markedDates = new Set([
    ...sessionMarkedDates(userState.sessions),
    ...attendedDates,
  ]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "profile-calendar-attendance",
        JSON.stringify(attendedDates),
      );
    } catch {
      // ignore storage failures
    }
  }, [attendedDates]);

  function daysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function buildMonthGrid(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const total = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    // create empty slots for the first week (0 = Sun)
    const pad = firstDay;
    const cells: (Date | null)[] = [];
    for (let i = 0; i < pad; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));
    return cells;
  }

  function toggleDate(d: Date) {
    const key = formatISO(d);
    setAttendedDates((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  }

  function prevMonth() {
    setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  function initials() {
    return (
      (userState.firstName?.[0] || "") + (userState.lastName?.[0] || "")
    ).toUpperCase();
  }

  function handleAddCourse(e?: React.FormEvent) {
    e?.preventDefault();
    if (!courseName.trim()) return;
    const newCourse: Course = {
      name: courseName.trim(),
      section: courseSection.trim() || undefined,
      professor: courseProfessor.trim() || undefined,
    };
    setUserState((prev) => ({
      ...prev,
      courses: [...prev.courses, newCourse],
    }));
    setCourseName("");
    setCourseSection("");
    setCourseProfessor("");
    setShowAddCourse(false);
  }

  function removeCourse(index: number) {
    setUserState((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  }

  function openEditProfile() {
    setEditValues({
      firstName: userState.firstName,
      lastName: userState.lastName,
      year: userState.year || "",
      major: userState.major || "",
    });
    setShowEditProfile(true);
  }

  async function handleSaveProfile(e?: React.FormEvent) {
    e?.preventDefault();

    try {
      await updateProfile({
        name: `${editValues.firstName} ${editValues.lastName}`,
        major: editValues.major,
        year: editValues.year ?? "",
      })
      setUserState((prev) => ({ ...prev, ...editValues }) as User);
      setShowEditProfile(false);
    }catch (err){
      console.error("Failed to save profile:", err)
      alert("Failed to save — please try again")
    }
  }

  return (
    <div className={styles.root}>
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
      <div className={styles.shell}>
        <div className={styles.heroCard}>
          <div className={styles.profileRow}>
            <div className={styles.pfp}>{initials()}</div>
            <div className={styles.profileInfo}>
              <div className={styles.nameRow}>
                <div>
                  <h1 className={styles.name}>
                    {userState.firstName} {userState.lastName}
                  </h1>
                  <div className={styles.summary}>
                    {userState.major} • {userState.year}
                  </div>
                </div>
                <div className={styles.actionRow}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={openEditProfile}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentCard}>
          {/* <section className={styles.section}>
            <div className={styles.overviewBanner}>
              <h3 className={styles.panelTitle}>Quick Overview</h3>
              <p className={styles.overviewText}>
                Snapshot of your profile and recent activity — quick to scan
                while keeping focus on what&apos;s important.
              </p>
            </div>
          </section> */}

          <section className={styles.section}>
            <div className={styles.insightGrid}>
              <div className={styles.listCard}>
                <div className={styles.listCardTop}>
                  <div>
                    <h3 className={styles.listTitle}>Courses</h3>
                    {/* <div className={styles.courseCountBadge}>
                      Active: {userState.courses.length}
                    </div> */}
                  </div>
                  <div>
                    <button
                      type="button"
                      className={styles.buttonSmall}
                      onClick={() => setShowAddCourse(true)}
                    >
                      Add course
                    </button>
                  </div>
                </div>
                <div className={styles.courseGrid}>
                  {userState.courses.map((c, i) => (
                    <article
                      className={styles.courseCard}
                      key={`${c.name}-${i}`}
                    >
                      <div className={styles.courseCardTop}>
                        <div>
                          <div className={styles.courseTitle}>{c.name}</div>
                          <div className={styles.courseMeta}>
                            Section {c.section || "TBA"}
                          </div>
                        </div>
                        {/* <div className={styles.coursePill}>
                          {c.professor || "Professor TBA"}
                        </div> */}
                      </div>
                      <div className={styles.courseCardBottom}>
                        <div className={styles.courseInfoRow}>
                          <span className={styles.courseInfoLabel}>
                            Section
                          </span>
                          <span className={styles.courseInfoValue}>
                            {c.section || "Not set"}
                          </span>
                        </div>
                        <div className={styles.courseInfoRow}>
                          <span className={styles.courseInfoLabel}>
                            Professor
                          </span>
                          <span className={styles.courseInfoValue}>
                            {c.professor || "Not set"}
                          </span>
                        </div>
                      </div>
                      <div className={styles.courseActions}>
                        <button
                          type="button"
                          className={styles.dangerButton}
                          onClick={() => removeCourse(i)}
                        >
                          Remove course
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Triton health widget */}
              <TritonHealth health={health} />

              <div className={styles.listCard}>
                
                <h3 className={styles.listTitle}>Sessions</h3>
                <div className={styles.sessionDetails}>
                  {userState.sessions.map((s, i) => (
                    <div className={styles.sessionCard} key={i}>
                      <div className={styles.panelTitle}>{s.name}</div>
                      <div className={styles.listMeta}>{s.course}</div>
                      <div className={styles.sessionTime}>{s.time}</div>
                    </div>
                  ))}
                </div>
                
              </div>

              <div className={styles.listCard}>
                <h3 className={styles.listTitle}>History</h3>
                <div className={styles.timeline}>
                  {userState.history.map((h, i) => (
                    <div key={i} className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.panelTitle}>{h.groupName}</div>
                        <div className={styles.listMeta}>
                          {h.course} — {h.meetings} meetings
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>
            
          </section>
          
          {/* <section
            className={`${styles.section} ${styles.calendarFullSection}`}
          >
            <div className={`${styles.panelCard} ${styles.calendarFullCard}`}>
              <div className={styles.calendarHeader}>
                <div>
                  <strong>Study Calendar</strong>
                  <div className={styles.calendarMonthLabel}>
                    {formatMonthLabel(calendarMonth)}
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={styles.buttonSmall}
                    onClick={prevMonth}
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className={styles.buttonSmall}
                    onClick={nextMonth}
                  >
                    ▶
                  </button>
                </div>
              </div>
              <div className={styles.calendarFull}>
                <div className={styles.calendarWeekNames}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (n) => (
                      <div key={n} className={styles.calendarWeekName}>
                        {n}
                      </div>
                    ),
                  )}
                </div>
                <div className={styles.calendarFullGrid}>
                  {buildMonthGrid(calendarMonth).map((cell, idx) => {
                    if (!cell)
                      return (
                        <div
                          key={idx}
                          className={styles.calendarCellEmpty}
                        ></div>
                      );
                    const iso = formatISO(cell);
                    const active = markedDates.has(iso);
                    return (
                      <button
                        key={iso}
                        className={
                          active
                            ? `${styles.calendarDay} ${styles.calendarDayActive} ${styles.calendarDayFull}`
                            : `${styles.calendarDay} ${styles.calendarDayFull}`
                        }
                        onClick={() => toggleDate(cell)}
                        title={iso}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.calendarLegend}>
                  <span className={styles.calendarLegendDot}></span> Joined
                  study group
                </div>
              </div>
            </div>
          </section> */}
        </div>

        {showAddCourse && (
          <div className={styles.modalOverlay}>
            <form className={styles.modal} onSubmit={handleAddCourse}>
              <div className={styles.modalHeader}>
                <div>
                  <div className={styles.modalTitle}>Add course</div>
                  <div className={styles.modalSubtitle}>
                    Store the course name, section, and professor in one clear
                    card.
                  </div>
                </div>
              </div>
              <div className={styles.fieldGrid}>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Course name</span>
                  <input
                    className={styles.formInput}
                    placeholder="CSE 30"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </label>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Section</span>
                  <input
                    className={styles.formInput}
                    placeholder="A00"
                    value={courseSection}
                    onChange={(e) => setCourseSection(e.target.value)}
                  />
                </label>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Professor</span>
                  <input
                    className={styles.formInput}
                    placeholder="Professor name"
                    value={courseProfessor}
                    onChange={(e) => setCourseProfessor(e.target.value)}
                  />
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.inlineButton}
                  onClick={() => setShowAddCourse(false)}
                >
                  Cancel
                </button>
                <button className={styles.button} type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {showEditProfile && (
          <div className={styles.modalOverlay}>
            <form className={styles.modal} onSubmit={handleSaveProfile}>
              <div className={styles.modalHeader}>
                <div>
                  <div className={styles.modalTitle}>Edit profile</div>
                  {/* <div className={styles.modalSubtitle}>
                    Update the details that matter most in your profile.
                  </div> */}
                </div>
              </div>
              <div className={styles.fieldGrid}>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>First name</span>
                  <input
                    className={styles.formInput}
                    value={editValues.firstName}
                    onChange={(e) =>
                      setEditValues((v) => ({
                        ...v,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Last name</span>
                  <input
                    className={styles.formInput}
                    value={editValues.lastName}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, lastName: e.target.value }))
                    }
                  />
                </label>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Year</span>
                  <input
                    className={styles.formInput}
                    value={editValues.year}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, year: e.target.value }))
                    }
                  />
                </label>
                <label className={styles.fieldGroup}>
                  <span className={styles.fieldLabel}>Major</span>
                  <input
                    className={styles.formInput}
                    value={editValues.major}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, major: e.target.value }))
                    }
                  />
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.inlineButton}
                  onClick={() => setShowEditProfile(false)}
                >
                  Cancel
                </button>
                <button className={styles.button} type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
