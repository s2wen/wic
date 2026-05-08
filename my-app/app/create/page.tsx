"use client"
import styles from "./create.module.css"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { allCourses } from "./courses"

const locations = [
    { value: "geisel",      label: "Geisel Library",        desc: "Main library, all floors",     icon: "📍" },
    { value: "pricecenter", label: "Price Center",          desc: "Cafeteria + study lounges",    icon: "📍" },
    { value: "ovt",         label: "OVT",                   desc: "Original Student Center",      icon: "📍" },
    { value: "64degrees",   label: "64 Degrees",            desc: "ERC dining hall",              icon: "📍" },
    { value: "fah",         label: "Franklin Antonio Hall", desc: "Engineering, 4th floor",       icon: "📍" },
    { value: "galbraith",   label: "Galbraith Hall",        desc: "Revelle College",              icon: "📍" },
    { value: "online",      label: "Online (Zoom)",         desc: "Link sent after creation",     icon: "💻" },
];

const studyCategories = ["Midterms", "Finals", "Assignments", "Lecture review"];

const preferenceOptions = [
    { value: "smallgroups", label: "Small group (2–6)" },
    { value: "biggroups",   label: "Big group (7+)" },
    { value: "1on1",        label: "1 on 1" },
    { value: "other",       label: "Other" },
];

export default function CreateStudyGroup() {
    const name     = "Shiloh Hsieh";
    const pronouns = "She/Her";
    const year     = "Freshman";
    const major    = "Math-CS";
    const email    = "s1hsieh@ucsd.edu";

    const [groupName,    setGroupName]    = useState("");
    const [description,  setDescription]  = useState("");
    const [inputValue,  setInputValue]  = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [role,        setRole]        = useState<"student" | "tutor">("student");
    const [day,         setDay]         = useState("");
    const [timeFrom,    setTimeFrom]    = useState("16:00");
    const [timeTo,      setTimeTo]      = useState("18:00");
    const [location,    setLocation]    = useState("");
    const [categories,  setCategories]  = useState<Set<string>>(new Set());
    const [preference,  setPreference]  = useState("smallgroups");

    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const query = inputValue.toLowerCase().trim();

    const filtered = (query === "" ? allCourses : allCourses.filter(c =>
        c.label.toLowerCase().includes(query)
    )).sort((a, b) => {
        const scoreOf = (c: typeof allCourses[0]) => {
            const dept  = c.dept.toLowerCase();
            const code  = c.value; // e.g. "ethn-185a"
            const qNorm = query.replace(/\s+/g, "-");
            if (dept.startsWith(query) || code.startsWith(qNorm)) return 3;
            if (dept.includes(query)   || code.includes(qNorm))   return 2;
            return 1;
        };
        return scoreOf(b) - scoreOf(a) || a.label.localeCompare(b.label);
    });

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleCategory = (cat: string) => {
        setCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat); else next.add(cat);
            return next;
        });
    };

    const fmt12 = (t: string) => {
        if (!t) return "";
        const [h, m] = t.split(":").map(Number);
        const ampm = h >= 12 ? "PM" : "AM";
        const h12  = h % 12 || 12;
        return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    const previewWhen  = () => {
        const t = `${fmt12(timeFrom)} – ${fmt12(timeTo)}`;
        return day ? `${day} · ${t}` : `Day pending · ${t}`;
    };
    const previewWhere = () => locations.find(l => l.value === location)?.label || "Location pending";
    const previewPref  = () => preferenceOptions.find(p => p.value === preference)?.label || "";

    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <ul className={styles.navLinks}>
                    <li className={styles.element}><Link href="/">Home</Link></li>
                    <li className={styles.element}><Link href="/leaderboard">LeaderBoard</Link></li>
                    <li className={styles.element}><Link href="/profile">Profile</Link></li>
                </ul>
                <button className={styles.authButton}>Sign Out</button>
            </div>
        </nav>

        <div className={styles.page}>

            {/* ── Step bar ── */}
            <div className={styles.stepBar}>
                <div className={styles.stepBarInner}>
                    <div className={styles.steps}>
                        <span className={styles.stepNumActive}>1</span>
                        <span className={styles.stepLabelActive}>Details</span>
                        <span className={styles.stepLine} />
                        <span className={styles.stepNum}>2</span>
                        <span className={styles.stepLabel}>Review</span>
                        <span className={styles.stepLine} />
                        <span className={styles.stepNum}>3</span>
                        <span className={styles.stepLabel}>Done</span>
                    </div>
                </div>
            </div>

            {/* ── Page header ── */}
            <div className={styles.formHeader}>
                <h1 className={styles.pageTitle}>Create a study group</h1>
                <p className={styles.pageSubtitle}>Pick a course, a time, a place — we&apos;ll match you with classmates studying the same thing.</p>
            </div>

            {/* ── Two-column body ── */}
            <div className={styles.formContent}>
                <div className={styles.formMain}>

                    {/* 01 · Your details */}
                    <div className={styles.section}>
                        <div className={styles.sectionMeta}>
                            <span>01 · </span>
                            <a href="#" className={styles.editLink}>Edit profile</a>
                        </div>
                        <h2 className={styles.sectionTitle}>Your details</h2>
                        <p className={styles.sectionDesc}>This profile shows on the group listing and to anyone who joins.</p>
                        <div className={styles.profileRow}>
                            <div className={styles.avatar}>SH</div>
                            <div className={styles.profileInfo}>
                                <div className={styles.profileName}>
                                    {name} <span className={styles.pronouns}>{pronouns}</span>
                                </div>
                                <div className={styles.profilePills}>
                                    <span className={styles.pill}>{year}</span>
                                    <span className={styles.pill}>{major}</span>
                                    <span className={styles.pill}>{email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 02 · Group name & description */}
                    <div className={styles.section}>
                        <div className={styles.sectionMeta}>02 · ABOUT</div>
                        <h2 className={styles.sectionTitle}>Name &amp; description</h2>
                        <p className={styles.sectionDesc}>Give your group a title and a short description so others know what to expect.</p>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Group name <span className={styles.required}>*</span></label>
                            <input
                                className={styles.searchInput}
                                type="text"
                                placeholder="e.g. CSE 12 Midterm Prep Squad"
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                                maxLength={80}
                            />
                            <p className={styles.charCount}>{groupName.length}/80</p>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Description</label>
                            <textarea
                                className={styles.descTextarea}
                                placeholder="What will you cover? Any prerequisites? Bring your laptop?"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                maxLength={300}
                                rows={4}
                            />
                            <p className={styles.charCount}>{description.length}/300</p>
                        </div>
                    </div>

                    {/* 03 · Subject & role */}
                    <div className={styles.section}>
                        <div className={styles.sectionMeta}>03 · WHAT</div>
                        <h2 className={styles.sectionTitle}>Subject &amp; role</h2>
                        <p className={styles.sectionDesc}>Choose the class and whether you&apos;re tutoring or studying along.</p>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Course <span className={styles.required}>*</span></label>
                            <div className={styles.searchWrapper} ref={searchRef}>
                                <input
                                    className={styles.searchInput}
                                    type="text"
                                    placeholder="Search by code or name... e.g. CSE 110, Linear Algebra"
                                    value={inputValue}
                                    onChange={e => { setInputValue(e.target.value); setShowDropdown(true); }}
                                    onFocus={() => setShowDropdown(true)}
                                />
                                {showDropdown && (
                                    <ul className={styles.searchDropdown}>
                                        {filtered.length > 0 ? filtered.map(c => (
                                            <li key={c.value} className={styles.searchOption}
                                                onMouseDown={() => { setInputValue(c.label); setShowDropdown(false); }}>
                                                {c.label}
                                            </li>
                                        )) : (
                                            <li className={styles.searchNoResult}>No classes found</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>I&apos;m joining as</label>
                            <div className={styles.toggleGroup}>
                                <button className={role === "student" ? styles.toggleActive : styles.toggle} onClick={() => setRole("student")}>
                                    📖 Studying along
                                </button>
                                <button className={role === "tutor" ? styles.toggleActive : styles.toggle} onClick={() => setRole("tutor")}>
                                    🎓 Tutoring others
                                </button>
                            </div>
                            <p className={styles.toggleHint}>
                                {role === "student"
                                    ? "You'll be a peer-study host — anyone can join and contribute."
                                    : "You'll lead the session as a tutor."}
                            </p>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Group size</label>
                            <div className={styles.chipGroup}>
                                {preferenceOptions.map(p => (
                                    <button key={p.value}
                                        className={preference === p.value ? styles.chipActive : styles.chip}
                                        onClick={() => setPreference(p.value)}>
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Focus on</label>
                            <div className={styles.chipGroup}>
                                {studyCategories.map(cat => (
                                    <button key={cat}
                                        className={categories.has(cat) ? styles.chipActive : styles.chip}
                                        onClick={() => toggleCategory(cat)}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 04 · Day & time */}
                    <div className={styles.section}>
                        <div className={styles.sectionMeta}>04 · WHEN</div>
                        <h2 className={styles.sectionTitle}>Day &amp; time</h2>
                        <p className={styles.sectionDesc}>One-time meeting. We&apos;ll surface it on the group&apos;s date.</p>
                        <div className={styles.timeGrid}>
                            <div className={styles.timeCol}>
                                <label className={styles.fieldLabel}>Day of week</label>
                                <select className={styles.formSelect} value={day} onChange={e => setDay(e.target.value)}>
                                    <option value="">Select a day...</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>
                            <div className={styles.timeCol}>
                                <label className={styles.fieldLabel}>From</label>
                                <input className={styles.timeInput} type="time" value={timeFrom} onChange={e => setTimeFrom(e.target.value)} />
                            </div>
                            <div className={styles.timeCol}>
                                <label className={styles.fieldLabel}>To</label>
                                <input className={styles.timeInput} type="time" value={timeTo} onChange={e => setTimeTo(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* 05 · Location */}
                    <div className={styles.section}>
                        <div className={styles.sectionMeta}>05 · WHERE</div>
                        <h2 className={styles.sectionTitle}>Location</h2>
                        <p className={styles.sectionDesc}>Pick an on-campus spot, or host online.</p>
                        <div className={styles.locationList}>
                            {locations.map(loc => (
                                <label key={loc.value}
                                    className={`${styles.locationItem}${location === loc.value ? ` ${styles.locationItemActive}` : ""}`}>
                                    <span className={styles.locationIcon}>{loc.icon}</span>
                                    <span className={styles.locationText}>
                                        <span className={styles.locationName}>{loc.label}</span>
                                        <span className={styles.locationDesc}>{loc.desc}</span>
                                    </span>
                                    <input type="radio" name="location" value={loc.value}
                                        checked={location === loc.value}
                                        onChange={() => setLocation(loc.value)}
                                        className={styles.locationRadio} />
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className={styles.createButton} onClick={() => {
                        const params = new URLSearchParams({
                            groupName,
                            description,
                            course:     inputValue,
                            role,
                            preference,
                            categories: [...categories].join(","),
                            day,
                            timeFrom,
                            timeTo,
                            location,
                        });
                        router.push(`/review?${params.toString()}`);
                    }}>Create Study Group</button>
                </div>

                {/* ── Preview panel ── */}
                <div className={styles.previewPanel}>
                    <div className={styles.previewHeader}>PREVIEW · HOW IT APPEARS IN LISTINGS</div>
                    <div className={styles.previewCard}>
                        <h3 className={styles.previewTitle}>{groupName || "Untitled study group"}</h3>
                        <p className={groupName ? styles.previewDesc : styles.previewPlaceholder}>
                            {description || "Add a short description so others know what to expect."}
                        </p>
                        <div className={styles.previewTags}>
                            <span className={styles.previewTag}>{role === "student" ? "Peer study" : "Tutoring"}</span>
                            <span className={styles.previewTag}>{previewPref()}</span>
                        </div>
                        <table className={styles.previewTable}>
                            <tbody>
                                <tr>
                                    <td className={styles.previewKey}>SUBJECT</td>
                                    <td className={styles.previewVal}>{inputValue || "Subject pending"}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>WHEN</td>
                                    <td className={styles.previewVal}>{previewWhen()}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>WHERE</td>
                                    <td className={styles.previewVal}>{previewWhere()}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>CAPACITY</td>
                                    <td className={styles.previewVal}>6 members max</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={styles.previewHostRow}>
                            <div className={styles.previewAvatar}>SH</div>
                            <div>
                                <div className={styles.previewHostName}>Hosted by {name}</div>
                                <div className={styles.previewHostInfo}>{year} · {major}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.previewTip}>
                        <span className={styles.tipIcon}>i</span>
                        <span>Tip — groups with a clear description and a specific course chapter get joined <strong>3x more</strong> than generic ones.</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
