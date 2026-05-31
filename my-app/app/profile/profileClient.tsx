"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import styles from "./profile_page.module.css";
import { updateProfile } from "./actions";

export type Course = { name: string };

export type User = {
  name: string;
  pronouns: string;
  university: string;
  major: string;
  year: string;
  email: string;
};

export default function Profile({
  dbUser,
}: {
  dbUser: {
    name: string | null;
    email: string;
    major: string | null;
    year: string | null;
    classes: string[];
  };
}) {
  const [profile, setProfile] = useState<User>({
    name: dbUser.name ?? "",
    pronouns: "she/her",
    university: "UC San Diego",
    major: dbUser.major ?? "",
    year: dbUser.year ?? "",
    email: dbUser.email,
  });

  const [courses, setCourses] = useState<string[]>(dbUser.classes);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseInput, setCourseInput] = useState("");
  const [courseError, setCourseError] = useState("");
  const [editValues, setEditValues] = useState({
    name: dbUser.name ?? "",
    pronouns: "she/her",
    university: "UC San Diego",
    major: dbUser.major ?? "",
    year: dbUser.year ?? "",
  });

  function initials(name: string) {
    const parts = name.trim().split(" ");
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  }

  function openAddModal() {
    setCourseInput("");
    setCourseError("");
    setShowAddModal(true);
  }

  function handleAddCourse() {
    const val = courseInput.trim();
    if (!val) return;
    if (courses.some((c) => c.toLowerCase() === val.toLowerCase())) {
      setCourseError("This course is already in your list.");
      return;
    }
    setCourses((prev) => [...prev, val]);
    setShowAddModal(false);
  }

  function openEditModal() {
    setEditValues({
      name: profile.name,
      pronouns: profile.pronouns,
      university: profile.university,
      major: profile.major,
      year: profile.year,
    });
    setShowEditModal(true);
  }

  async function handleSaveProfile() {
    try {
      await updateProfile({
        name: editValues.name,
        major: editValues.major,
        year: editValues.year,
      });
      setProfile((prev) => ({ ...prev, ...editValues }));
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save — please try again");
    }
  }

  return (
    <div className={styles.root}>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/homepage" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className={styles.navLink}>
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className={`${styles.navLink} ${styles.navLinkActive}`}
              >
                Profile
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className={styles.authButton}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className={styles.shell}>
        {/* Hero card */}
        <div className={`${styles.card} ${styles.heroCard}`}>
          <div className={styles.heroAccent} />
          <div className={styles.heroBody}>
            <div className={styles.profileRow}>
              <div className={styles.pfp}>{initials(profile.name)}</div>
              <div className={styles.heroInfo}>
                <div className={styles.nameRow}>
                  <div>
                    <div className={styles.nameBlock}>
                      <h1 className={styles.name}>{profile.name || "—"}</h1>
                      {profile.pronouns && (
                        <span className={styles.pronounPill}>
                          {profile.pronouns}
                        </span>
                      )}
                    </div>
                    <div className={styles.infoChips}>
                      {profile.university && (
                        <span className={styles.infoChip}>
                          <span className={styles.chipDot} />
                          {profile.university}
                        </span>
                      )}
                      {profile.major && (
                        <span className={styles.infoChip}>
                          <span className={styles.chipDot} />
                          {profile.major}
                        </span>
                      )}
                      {profile.year && (
                        <span className={styles.infoChip}>
                          <span className={styles.chipDot} />
                          {profile.year}
                        </span>
                      )}
                      <span className={styles.emailChip}>
                        <span className={styles.emailIcon}>@</span>
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={openEditModal}
                  >
                    Edit Profile
                  </button>
                </div>
                <div className={styles.statsStrip}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>{courses.length}</span>
                    <span className={styles.statLabel}>Courses</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>2</span>
                    <span className={styles.statLabel}>Study Groups</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>May 2025</span>
                    <span className={styles.statLabel}>Member since</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses card */}
        <div className={`${styles.card} ${styles.coursesCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleRow}>
              <span className={styles.cardTitle}>Courses</span>
              <span className={styles.cardCountBadge}>
                Active courses: {courses.length}
              </span>
            </div>
            <button
              type="button"
              className={styles.btnSmall}
              onClick={openAddModal}
            >
              + Add course
            </button>
          </div>
          <div className={styles.courseGrid}>
            {courses.length === 0 ? (
              <div className={styles.emptyState}>
                No courses yet — add one above.
              </div>
            ) : (
              courses.map((c, i) => {
                const isPending = pendingDelete === i;
                return (
                  <div
                    key={`${c}-${i}`}
                    className={`${styles.courseCard}${isPending ? ` ${styles.courseCardPending}` : ""}`}
                  >
                    <span className={styles.courseTitle}>{c}</span>
                    <div className={styles.courseActions}>
                      {isPending ? (
                        <>
                          <span className={styles.deleteWarn}>
                            Remove this course?
                          </span>
                          <button
                            type="button"
                            className={styles.btnConfirmRemove}
                            onClick={() => {
                              setCourses((prev) =>
                                prev.filter((_, idx) => idx !== i),
                              );
                              setPendingDelete(null);
                            }}
                          >
                            Yes, remove
                          </button>
                          <button
                            type="button"
                            className={styles.btnInline}
                            onClick={() => setPendingDelete(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className={styles.btnDanger}
                          onClick={() => setPendingDelete(i)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Study Groups card */}
        <div className={`${styles.card} ${styles.groupsCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleRow}>
              <span className={styles.cardTitle}>Study Groups</span>
              <span className={styles.cardCountBadge}>2 joined</span>
            </div>
          </div>
          <div className={styles.groupGrid}>
            <div className={styles.groupItem}>
              <div className={styles.groupIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.groupInfo}>
                <div className={styles.groupName}>CSE Study Squad</div>
                <div className={styles.groupMeta}>CSE · 4 members</div>
              </div>
            </div>
            <div className={styles.groupItem}>
              <div className={styles.groupIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.groupInfo}>
                <div className={styles.groupName}>Math 18 Group</div>
                <div className={styles.groupMeta}>MATH · 3 members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCourse();
            }}
          >
            <div className={styles.modalTitle}>Add course</div>
            <label className={styles.fieldGroup}>
              <span className={styles.fieldLabel}>Course name</span>
              <input
                className={styles.formInput}
                placeholder="e.g. CSE 30"
                value={courseInput}
                onChange={(e) => {
                  setCourseInput(e.target.value);
                  setCourseError("");
                }}
                autoFocus
              />
              <span className={styles.courseError}>{courseError}</span>
            </label>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.btnInline}
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.btnPrimary}>
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditModal(false);
          }}
        >
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <div className={styles.modalTitle}>Edit profile</div>
            <div className={styles.fieldGrid}>
              <label className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Name</span>
                <input
                  className={styles.formInput}
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues((v) => ({ ...v, name: e.target.value }))
                  }
                />
              </label>
              <label className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Pronouns</span>
                <select
                  className={styles.formInput}
                  value={editValues.pronouns}
                  onChange={(e) =>
                    setEditValues((v) => ({ ...v, pronouns: e.target.value }))
                  }
                >
                  <option value="">Select pronouns</option>
                  <option value="he/him">he/him</option>
                  <option value="she/her">she/her</option>
                  <option value="they/them">they/them</option>
                  <option value="other">other</option>
                  <option value="prefer not to say">prefer not to say</option>
                </select>
              </label>
              <label className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>University</span>
                <input
                  className={styles.formInput}
                  value={editValues.university}
                  onChange={(e) =>
                    setEditValues((v) => ({ ...v, university: e.target.value }))
                  }
                />
              </label>
              <label className={styles.fieldGroup}>
                <span className={styles.fieldLabel}>Year</span>
                <select
                  className={styles.formInput}
                  value={editValues.year}
                  onChange={(e) =>
                    setEditValues((v) => ({ ...v, year: e.target.value }))
                  }
                >
                  <option value="">Select year</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Fourth Year">Fourth Year</option>
                </select>
              </label>
              <label
                className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}
              >
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
                className={styles.btnInline}
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.btnPrimary}>
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
