"use client"
import styles from "./review.module.css"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"

const locations = [
    { value: "geisel",      label: "Geisel Library",        desc: "Main library, all floors" },
    { value: "pricecenter", label: "Price Center",          desc: "Cafeteria + study lounges" },
    { value: "ovt",         label: "OVT",                   desc: "Original Student Center" },
    { value: "64degrees",   label: "64 Degrees",            desc: "ERC dining hall" },
    { value: "fah",         label: "Franklin Antonio Hall", desc: "Engineering, 4th floor" },
    { value: "galbraith",   label: "Galbraith Hall",        desc: "Revelle College" },
    { value: "online",      label: "Online (Zoom)",         desc: "Link sent after creation" },
];

const preferenceOptions = [
    { value: "smallgroups", label: "Small group (2–6)", max: "6 members" },
    { value: "biggroups",   label: "Big group (7+)",    max: "7+ members" },
    { value: "1on1",        label: "1 on 1",            max: "2 members" },
    { value: "other",       label: "Other",             max: "—" },
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
    const preference     = params.get("preference")  || "smallgroups";
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
    const pref     = preferenceOptions.find(p => p.value === preference);
    const whenStr  = day
        ? `${day} · ${fmt12(timeFrom)} – ${fmt12(timeTo)}`
        : fmt12(timeFrom) ? `${fmt12(timeFrom)} – ${fmt12(timeTo)}` : "—";
    const whereStr = loc ? `${loc.label} · ${loc.desc}` : "—";

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
                    <span className={styles.stepMeta}>Direction A · review</span>
                </div>
            </div>

            {/* ── Page header ── */}
            <div className={styles.formHeader}>
                <h1 className={styles.pageTitle}>One last look</h1>
                <p className={styles.pageSubtitle}>Confirm the details below — your group goes live right after.</p>
            </div>

            {/* ── Two-column body ── */}
            <div className={styles.formContent}>

                {/* Left: review card */}
                <div className={styles.reviewCard}>
                    <div className={styles.reviewMeta}>REVIEW</div>
                    <h2 className={styles.reviewTitle}>Group details</h2>
                    <p className={styles.reviewDesc}>Anything wrong? Hit back to edit.</p>

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
                                <td className={styles.detailVal}>{role === "student" ? "Studying along" : "Tutoring others"}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>WHEN</td>
                                <td className={styles.detailVal}>{whenStr}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>WHERE</td>
                                <td className={styles.detailVal}>{whereStr}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>SIZE</td>
                                <td className={styles.detailVal}>{pref?.label || "—"}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>MAX MEMBERS</td>
                                <td className={styles.detailVal}>{pref?.max || "—"}</td>
                            </tr>
                            <tr>
                                <td className={styles.detailKey}>VISIBILITY</td>
                                <td className={styles.detailVal}>
                                    <span className={styles.pill}>Public</span>
                                </td>
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
                        <span className={styles.footerNote}>You&apos;ll be able to edit anything except the course later.</span>
                        <div className={styles.footerActions}>
                            <button className={styles.backButton} onClick={() => router.back()}>
                                ← Back to edit
                            </button>
                            <button className={styles.publishButton} onClick={() => {
                                const p = new URLSearchParams({
                                    groupName, course, day, timeFrom, timeTo,
                                    location: locationVal, preference,
                                });
                                router.push(`/confirmation?${p.toString()}`);
                            }}>Publish group</button>
                        </div>
                    </div>
                </div>

                {/* Right: preview panel */}
                <div className={styles.previewPanel}>
                    <div className={styles.previewHeader}>PREVIEW · HOW IT APPEARS IN LISTINGS</div>
                    <div className={styles.previewCard}>
                        <h3 className={styles.previewTitle}>{groupName || "Untitled study group"}</h3>
                        {description
                            ? <p className={styles.previewDesc}>{description}</p>
                            : <p className={styles.previewPlaceholder}>No description provided.</p>
                        }
                        <div className={styles.previewTags}>
                            <span className={styles.previewTag}>{role === "student" ? "Peer study" : "Tutoring"}</span>
                            {pref && <span className={styles.previewTag}>{pref.label}</span>}
                        </div>
                        <table className={styles.previewTable}>
                            <tbody>
                                <tr>
                                    <td className={styles.previewKey}>SUBJECT</td>
                                    <td className={styles.previewVal}>{course || "—"}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>WHEN</td>
                                    <td className={styles.previewVal}>{whenStr}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>WHERE</td>
                                    <td className={styles.previewVal}>{loc?.label || "—"}</td>
                                </tr>
                                <tr>
                                    <td className={styles.previewKey}>CAPACITY</td>
                                    <td className={styles.previewVal}>{pref?.max || "—"}</td>
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
