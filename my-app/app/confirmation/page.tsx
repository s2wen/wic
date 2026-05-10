"use client"
import styles from "./confirmation.module.css"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useMemo } from "react"
import {signOut} from "next-auth/react";

const locations: Record<string, string> = {
    geisel:      "Geisel Library",
    pricecenter: "Price Center",
    ovt:         "OVT",
    "64degrees": "64 Degrees",
    fah:         "Franklin Antonio Hall",
    galbraith:   "Galbraith Hall",
    online:      "Online (Zoom)",
};

const maxMembers: Record<string, string> = {
    smallgroups: "6",
    biggroups:   "7+",
    "1on1":      "2",
    other:       "—",
};

const fmt12 = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12  = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

function ConfirmationContent() {
    const params = useSearchParams();

    const groupName  = params.get("groupName")  || "Study session";
    const course     = params.get("course")     || "";
    const day        = params.get("day")        || "";
    const timeFrom   = params.get("timeFrom")   || "";
    const timeTo     = params.get("timeTo")     || "";
    const locationVal = params.get("location")  || "";
    const preference = params.get("preference") || "smallgroups";

    const locationLabel = locations[locationVal] || locationVal;
    const capacity      = maxMembers[preference] || "—";
    const whenStr       = day
        ? `${day} · ${fmt12(timeFrom)} – ${fmt12(timeTo)}`
        : fmt12(timeFrom) ? `${fmt12(timeFrom)} – ${fmt12(timeTo)}` : "—";

    const groupId = useMemo(() => {
        const n = Math.floor(10000 + Math.random() * 90000);
        return `SG-${n}`;
    }, []);

    const cardTitle = course ? `${course} — ${groupName}` : groupName;
    const subtitle  = course
        ? `It's now visible in the ${course} feed. We'll notify classmates studying the same material.`
        : "It's now visible in the feed. We'll notify classmates studying the same material.";

    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <ul className={styles.navLinks}>
                    <li className={styles.element}><Link href="/homepage">Home</Link></li>
                    <li className={styles.element}><Link href="/leaderboard">LeaderBoard</Link></li>
                    <li className={styles.element}><Link href="/profile">Profile</Link></li>
                </ul>
                <button className={styles.authButton} onClick={() => signOut({callbackUrl:'/'})}>Sign Out</button>
            </div>
        </nav>

        <div className={styles.page}>
            <div className={styles.card}>

                {/* ── Success icon ── */}
                <div className={styles.iconWrap}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                {/* ── Heading ── */}
                <h1 className={styles.title}>Your study group is live</h1>
                <p className={styles.subtitle}>{subtitle}</p>

                {/* ── Summary card ── */}
                <div className={styles.summaryCard}>
                    <div className={styles.summaryHeader}>
                        <span className={styles.summaryTitle}>{cardTitle}</span>
                        <span className={styles.publishedBadge}>Published</span>
                    </div>
                    <div className={styles.summaryRows}>
                        {whenStr !== "—" && (
                            <div className={styles.summaryRow}>
                                <span>📅</span>
                                <span>{whenStr}</span>
                            </div>
                        )}
                        {locationLabel && (
                            <div className={styles.summaryRow}>
                                <span>📍</span>
                                <span>{locationLabel}</span>
                            </div>
                        )}
                        {capacity !== "—" && (
                            <div className={styles.summaryRow}>
                                <span>👥</span>
                                <span>Up to {capacity} members</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Actions ── */}
                <div className={styles.actions}>
                    <Link href="/create" className={styles.secondaryButton}>Create another</Link>
                    <button className={styles.primaryButton}>View group page →</button>
                </div>

                {/* ── Footer ── */}
                <p className={styles.footerNote}>Group ID {groupId} · Created just now</p>
            </div>
        </div>
        </>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense>
            <ConfirmationContent />
        </Suspense>
    );
}
