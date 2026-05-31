"use client"
import styles from "./review.module.css"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

const locations = [
    { value: "geisel",      label: "Geisel Library",  desc: "Main library" },
    { value: "pricecenter", label: "Price Center",    desc: "2nd floor study spaces" },
    { value: "ovt",         label: "OVT",             desc: "Marshall dining hall" },
    { value: "64degrees",   label: "64 Degrees",      desc: "Revelle dining hall" },
    { value: "ventanas",         label: "Ventanas",        desc: "ERC dining hall" },
    { value: "galbraith",   label: "Galbraith Hall",  desc: "Revelle College" },
    { value: "online",      label: "Online (Zoom)",   desc: "" },
];

const fmt12 = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12  = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

function ReviewContent() {
    const params    = useSearchParams();
    const router    = useRouter();

    const groupName      = params.get("groupName")   || "";
    const description    = params.get("description") || "";
    const course         = params.get("course")      || "";
    const role           = params.get("role")        || "student";
    const categoriesRaw  = params.get("categories")  || "";
    const categories     = categoriesRaw ? categoriesRaw.split(",").filter(Boolean) : [];
    const day            = params.get("day")         || "";
    const timeFrom       = params.get("timeFrom")    || "";
    const timeTo         = params.get("timeTo")      || "";
    const locationVal    = params.get("location")    || "";

    const name     = "Shiloh Hsieh";
    const pronouns = "She/Her";
    const year     = "Freshman";
    const major    = "Math-CS";

    const loc      = locations.find(l => l.value === locationVal);
    const fmtDay   = (d: string) => {
        const [y, mo, dd] = d.split("-").map(Number);
        return new Date(y, mo - 1, dd).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    };
    const whenStr  = day
        ? `${fmtDay(day)} · ${fmt12(timeFrom)} – ${fmt12(timeTo)}`
        : fmt12(timeFrom) ? `${fmt12(timeFrom)} – ${fmt12(timeTo)}` : "—";
    const whereStr = loc ? loc.label : "—";

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
                        <span className={styles.stepNumDone}>✓</span>
                        <span className={styles.stepLabelDone}>Details</span>
                        <span className={styles.stepLine} />
                        <span className={styles.stepNumActive}>2</span>
                        <span className={styles.stepLabelActive}>Review</span>
                        <span className={styles.stepLine} />
                        <span className={styles.stepNum}>3</span>
                        <span className={styles.stepLabel}>Done</span>
                    </div>
                </div>
            </div>

            {/* ── Page header ── */}
            <div className={styles.formHeader}>
                <h1 className={styles.pageTitle}>Review Details</h1>
            </div>

            {/* ── Two-column body ── */}
            <div className={styles.formContent}>

                {/* Left: review card */}
                <div className={styles.reviewCard}>
                    <div className={styles.reviewMeta}>REVIEW</div>
                    <h2 className={styles.reviewTitle}>Group details</h2>

                    <table className={styles.detailTable}>
                        <tbody>
                            <tr>
                                <td className={styles.detailKey}>HOST</td>
                                <td className={styles.detailVal}>
                                    <div className={styles.hostRow}>
                                        <div className={styles.avatar}>SH</div>
                                        <div>
                                            <div className={styles.hostName}>
                                                {name} <span className={styles.pronouns}>{pronouns}</span>
                                            </div>
                                            <div className={styles.hostInfo}>{year} · {major}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>COURSE</td>
                                <td className={styles.detailVal}>{course || "—"}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>ROLE</td>
                                <td className={styles.detailVal}>{role === "student" ? "Student" : "Tutor"}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>WHEN</td>
                                <td className={styles.detailVal}>{whenStr}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>WHERE</td>
                                <td className={styles.detailVal}>{whereStr}</td>
                            </tr>
                            {categories.length > 0 && (
                                <tr>
                                    <td className={styles.detailKey}>FOCUS</td>
                                    <td className={styles.detailVal}>
                                        <div className={styles.chipRow}>
                                            {categories.map(cat => (
                                                <span key={cat} className={styles.chip}>{cat}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {description && (
                                <tr>
                                    <td className={styles.detailKey}>DESCRIPTION</td>
                                    <td className={styles.detailVal}>{description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className={styles.reviewFooter}>
                        <div className={styles.footerActions}>
                            <button className={styles.backButton} onClick={() => router.back()}>
                                ← Back to edit
                            </button>
                            <button className={styles.publishButton} onClick={() => {
                                const p = new URLSearchParams({
                                    groupName, course, day, timeFrom, timeTo,
                                    location: locationVal,
                                });
                                router.push(`/confirmation?${p.toString()}`);
                            }}>Publish group</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default function ReviewPage() {
    return (
        <Suspense>
            <ReviewContent />
        </Suspense>
    );
}
