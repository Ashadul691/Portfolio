import { IProject } from "@/models/Project";

// Used only until you add real projects via the admin dashboard.
export const fallbackProjects: IProject[] = [
  {
    title: "DevPulse — Issue Tracking API",
    slug: "devpulse",
    summary:
      "A role-based issue tracker API for contributors and maintainers, built with TypeScript, Express and PostgreSQL.",
    description:
      "DevPulse lets maintainers manage issues, assign contributors, and control access by role. It covers authentication, authorization middleware, and structured error handling across a modular Express codebase.",
    image: "/projects/devpulse.png",
    techStack: ["TypeScript", "Express", "PostgreSQL", "JWT"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username/devpulse",
    challenges:
      "Getting role-based permissions right across nested resources, and designing clean, RESTful endpoints for a growing feature set.",
    improvements:
      "Add real-time notifications, activity logs, and a public API rate limiter.",
  },
  {
    title: "Football Ticket Booking System",
    slug: "football-ticket-booking",
    summary:
      "A PostgreSQL-backed booking system covering users, matches, and bookings with reporting queries.",
    description:
      "Models a three-table relational schema (Users, Matches, Bookings) and answers real business questions with SQL — availability, revenue, and popular matches — as part of a database design assignment.",
    image: "/projects/football-booking.png",
    techStack: ["PostgreSQL", "SQL", "Node.js"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username/football-ticket-booking",
    challenges:
      "Writing efficient joins and aggregations for reporting queries, and enforcing data integrity with foreign keys and cascading deletes.",
    improvements:
      "Wrap the schema in a REST API, add seat-level booking, and build a small frontend for browsing matches.",
  },
  {
    title: "This Portfolio Dashboard",
    slug: "portfolio-dashboard",
    summary:
      "The very site you're looking at — a Next.js + TypeScript portfolio with a MongoDB-backed admin dashboard.",
    description:
      "Every project and skill on this page is editable from a private dashboard, backed by MongoDB and protected with JWT-based authentication in httpOnly cookies.",
    image: "/projects/portfolio.png",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username/portfolio",
    challenges:
      "Keeping the public site fast while content stays fully dynamic, and building simple, secure admin auth without a heavier framework.",
    improvements:
      "Add image uploads, analytics on visitor messages, and multi-admin support.",
  },
];
