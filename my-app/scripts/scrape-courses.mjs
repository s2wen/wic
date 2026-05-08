/**
 * Usage:
 *   node scripts/scrape-courses.mjs MATH
 *   node scripts/scrape-courses.mjs CSE DOC CHEM PHYS
 *   node scripts/scrape-courses.mjs --all          (every dept listed in the script)
 *
 * What it does:
 *   Fetches https://catalog.ucsd.edu/courses/DEPT.html for each dept,
 *   extracts undergraduate courses (numbered < 200),
 *   and writes/updates app/create/courses.ts.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COURSES_FILE = join(__dirname, "../app/create/courses.ts");
const BASE_URL = "https://catalog.ucsd.edu/courses/";

// Add more dept codes here as you expand
const ALL_DEPTS = [
    "MATH", "CSE", "DOC", "CHEM", "PHYS", "BIOL",
    "ECON", "POLI", "PSYC", "HIST", "PHIL", "COMM",
    "COGS", "BENG", "ECE", "MAE", "SE",
];

async function fetchCourses(dept) {
    const url = `${BASE_URL}${dept}.html`;
    console.log(`  Fetching ${url}...`);

    let html;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`  ⚠ ${dept}: HTTP ${res.status} — skipping`);
            return [];
        }
        html = await res.text();
    } catch (e) {
        console.warn(`  ⚠ ${dept}: network error — skipping`);
        return [];
    }

    // UCSD catalog pattern:
    //   <p class="course-name">MATH 18. Linear Algebra (4)</p>
    // The regex captures: group1 = "MATH 18", group2 = "Linear Algebra"
    const pattern = /<p class="course-name">([A-Z]+\s+[\w/]+)\.\s+([^(<\n]+)/g;
    const courses = [];
    let match;

    while ((match = pattern.exec(html)) !== null) {
        const code  = match[1].trim();
        const title = match[2].trim().replace(/\s+/g, " ");

        // Only undergrad: numeric part < 200
        const numPart = code.match(/(\d+)/);
        if (!numPart || parseInt(numPart[1]) >= 200) continue;

        const value = code.toLowerCase().replace(/\s+/g, "-");
        courses.push({ value, dept, label: `${code} (${title})` });
    }

    console.log(`  ✓ ${dept}: ${courses.length} undergrad courses found`);
    return courses;
}

function generateTs(coursesByDept) {
    const depts = Object.keys(coursesByDept).sort();

    const blocks = depts.map(dept => {
        const varName = dept.toLowerCase().replace(/[^a-z]/g, "_");
        const lines = coursesByDept[dept]
            .map(c => `    { value: "${c.value}", dept: "${c.dept}", label: "${c.label.replace(/"/g, '\\"')}" },`)
            .join("\n");
        return `const ${varName}: Course[] = [\n${lines}\n];`;
    });

    const exportLine =
        `export const allCourses: Course[] = [\n` +
        depts.map(d => `    ...${d.toLowerCase().replace(/[^a-z]/g, "_")},`).join("\n") +
        `\n];`;

    return [
        `export type Course = { value: string; label: string; dept: string };`,
        ``,
        ...blocks,
        ``,
        exportLine,
        ``,
    ].join("\n");
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("Usage: node scripts/scrape-courses.mjs DEPT [DEPT ...] | --all");
        process.exit(1);
    }

    const depts = args[0] === "--all" ? ALL_DEPTS : args.map(a => a.toUpperCase());
    console.log(`\nScraping ${depts.length} department(s): ${depts.join(", ")}\n`);

    // Read existing courses.ts and parse out every course already in the file
    const existing = {}; // { DEPT: Course[] }
    try {
        const src = readFileSync(COURSES_FILE, "utf8");
        const pattern = /{ value: "([^"]+)", dept: "([^"]+)", label: "([^"]+)" }/g;
        let m;
        while ((m = pattern.exec(src)) !== null) {
            const [, value, dept, label] = m;
            if (!existing[dept]) existing[dept] = [];
            existing[dept].push({ value, dept, label });
        }
        const existingDepts = Object.keys(existing);
        if (existingDepts.length > 0)
            console.log(`  Keeping existing: ${existingDepts.join(", ")}\n`);
    } catch { /* file doesn't exist yet — start fresh */ }

    // Scrape requested depts (these replace any existing data for that dept)
    const freshCourses = {};
    for (const dept of depts) {
        freshCourses[dept] = await fetchCourses(dept);
    }

    // Merge: fresh scrape wins for requested depts, existing data kept for the rest
    const merged = { ...existing, ...freshCourses };

    // Deduplicate across all depts by value — keep the first occurrence
    const seen = new Set();
    for (const dept of Object.keys(merged)) {
        merged[dept] = merged[dept].filter(c => {
            if (seen.has(c.value)) return false;
            seen.add(c.value);
            return true;
        });
    }

    const ts = generateTs(merged);
    writeFileSync(COURSES_FILE, ts, "utf8");

    const total = Object.values(merged).reduce((s, a) => s + a.length, 0);
    console.log(`\n✅ Done. ${total} total courses in app/create/courses.ts`);
}

main();
