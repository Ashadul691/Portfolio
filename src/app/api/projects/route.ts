import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { isAuthenticated } from "@/lib/auth";

// GET /api/projects -> list all projects (public)
export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json({ projects });
}

// POST /api/projects -> create a project (admin only)
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  try {
    const project = await Project.create(body);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
