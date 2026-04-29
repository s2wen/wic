// import { useEffect, useState } from "react";
import styles from "./profile_page.module.css";

export type Course = {
  name: string;
  section: string;
  professor: string;
};

export type StudyStyle = "Silent" | "Collaborative" | "Flexible";
export type GroupSize = "2-3" | "4-6" | "7+";

export type Preferences = {
  style: StudyStyle;
  groupSize: GroupSize;
  location: string;
  openToTutoring: boolean;
  tutoringFields: string[];
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  year: string;
  courses: Course[];
  preferences: Preferences;
};

const course1: Course = {
  name: "CSE 30",
  section: "A00",
  professor: "Bryan Chin",
};

const course2: Course = {
  name: "Math 20D",
  section: "B00",
  professor: "Rishabh Dixit",
};

const pref: Preferences = {
  style: "Silent",
  groupSize: "2-3",
  location: "Geisel Library",
  openToTutoring: true,
  tutoringFields: ["Math", "Basic programming"],
};

const user: User = {
  firstName: "Amanda",
  lastName: "Tsai",
  major: "Computer Engineering",
  year: "first",
  email: "a7tsai@ucsd.edu",
  courses: [course1, course2],
  preferences: pref
};

// main function
export default function Profile() {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.element}>
            <a href="../homepage/page.tsx">Home</a>
          </li>
          <li className={styles.element}>
            <a href="../groups/page.tsx">Find your group</a>
          </li>
        </ul>
      </nav>
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.profileRow}>
            <div className={styles.pfp}>
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.name}>
                {user.firstName} {user.lastName}
              </div>
              <div className={styles.badgeRow}>
                <div className={`${styles.body} ${styles.bodyinfo}`}>
                  {user.email}
                </div>
                <div className={`${styles.body} ${styles.bodyinfo}`}>
                  {user.major}
                </div>
                <div className={`${styles.body} ${styles.bodyinfo}`}>
                  {user.year} year
                </div>
              </div>
            </div>
            <button className={`${styles.button} ${styles.edit}`}>Edit</button>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>My Courses</div>
            <button className={`${styles.button} ${styles.addcourse}`}>
              + Add Course
            </button>
          </div>

          {user.courses.map((c, i) => (
            <div key={i} className={styles.item}>
              {c.name} - {c.section}
            </div>
          ))}
        </div>

        <div className={styles.info}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Study Preferences</div>
            <button className={`${styles.button} ${styles.buttonSmall}`}>
              Edit
            </button>
          </div>
          <div className={styles.prefGrid}>
            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Study Style</div>
              <div className={styles.prefValue}>{user.preferences.style}</div>
            </div>

            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Group Size</div>
              <div className={styles.prefValue}>
                {user.preferences.groupSize}
              </div>
            </div>

            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Preferred Location</div>
              <div className={styles.prefValue}>
                {user.preferences.location}
              </div>
            </div>

            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Open to Tutoring</div>
              <div className={styles.prefValue}>
                {user.preferences.openToTutoring ? "Yes" : "No"}
              </div>
              {user.preferences.openToTutoring && (
                <div className={styles.prefTagRow}>
                  {user.preferences.tutoringFields.map((field, i) => (
                    <span
                      key={i}
                      className={`${styles.prefValue} ${styles.prefTag}`}
                    >
                      {field}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
