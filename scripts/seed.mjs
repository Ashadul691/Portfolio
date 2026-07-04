/**
 * Seeds MongoDB with starter projects and skills so the site isn't empty
 * on first run. Safe to re-run — it skips items that already exist.
 *
 * Usage: npm run seed
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing. Add it to .env.local first.");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const SkillSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Project = mongoose.model("Project", ProjectSchema);
const Skill = mongoose.model("Skill", SkillSchema);

const projects = [
  {
    title: "DevPulse — Issue Tracking API",
    slug: "devpulse",
    summary:
      "A role-based issue tracker API for contributors and maintainers, built with TypeScript, Express and PostgreSQL.",
    description:
      "DevPulse lets maintainers manage issues, assign contributors, and control access by role. It covers authentication, authorization middleware, and structured error handling.",
    image: "/projects/devpulse.png",
    techStack: ["TypeScript", "Express", "PostgreSQL", "JWT"],
    githubUrl: "https://github.com/your-username/devpulse",
    challenges: "Getting role-based permissions right across nested resources.",
    improvements: "Add real-time notifications and an activity log.",
    order: 1,
  },
  {
    title: "Football Ticket Booking System",
    slug: "football-ticket-booking",
    summary:
      "A PostgreSQL-backed booking system covering users, matches, and bookings with reporting queries.",
    description:
      "Models a three-table relational schema (Users, Matches, Bookings) and answers business questions with SQL.",
    image: "/projects/football-booking.png",
    techStack: ["PostgreSQL", "SQL", "Node.js"],
    githubUrl: "https://github.com/your-username/football-ticket-booking",
    challenges: "Writing efficient joins and aggregations for reporting.",
    improvements: "Wrap the schema in a REST API with seat-level booking.",
    order: 2,
  },
  {
    title: "This Portfolio Dashboard",
    slug: "portfolio-dashboard",
    summary:
      "The very site you're looking at — a Next.js + TypeScript portfolio with a MongoDB-backed admin dashboard.",
    description:
      "Every project and skill on this page is editable from a private dashboard, backed by MongoDB.",
    image: "/projects/portfolio.png",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/your-username/portfolio",
    challenges: "Keeping the public site fast while content stays dynamic.",
    improvements: "Add image uploads and visitor message analytics.",
    order: 3,
  },
];

const skills = [
  { name: "JavaScript", category: "Frontend", level: 85, order: 1 },
  { name: "TypeScript", category: "Frontend", level: 80, order: 2 },
  { name: "React / Next.js", category: "Frontend", level: 75, order: 3 },
  { name: "Tailwind CSS", category: "Frontend", level: 80, order: 4 },
  { name: "Node.js", category: "Backend", level: 85, order: 1 },
  { name: "Express", category: "Backend", level: 85, order: 2 },
  { name: "REST API Design", category: "Backend", level: 80, order: 3 },
  { name: "JWT / Auth", category: "Backend", level: 75, order: 4 },
  { name: "PostgreSQL", category: "Database", level: 80, order: 1 },
  { name: "MongoDB", category: "Database", level: 75, order: 2 },
  { name: "Git & GitHub", category: "Tools", level: 85, order: 1 },
  { name: "Postman / curl", category: "Tools", level: 80, order: 2 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  for (const p of projects) {
    const exists = await Project.findOne({ slug: p.slug });
    if (!exists) {
      await Project.create(p);
      console.log(`Created project: ${p.title}`);
    } else {
      console.log(`Skipped (already exists): ${p.title}`);
    }
  }

  for (const s of skills) {
    const exists = await Skill.findOne({ name: s.name });
    if (!exists) {
      await Skill.create(s);
      console.log(`Created skill: ${s.name}`);
    } else {
      console.log(`Skipped (already exists): ${s.name}`);
    }
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
