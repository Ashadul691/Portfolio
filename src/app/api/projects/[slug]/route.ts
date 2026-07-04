import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { isAuthenticated } from "@/lib/auth";

// GET /api/projects/[slug] -> single project (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  const project = await Project.findOne({ slug: params.slug });
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

// PUT /api/projects/[slug] -> update (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const project = await Project.findOneAndUpdate({ slug: params.slug }, body, {
    new: true,
  });
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

// DELETE /api/projects/[slug] -> delete (admin only)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const project = await Project.findOneAndDelete({ slug: params.slug });
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
