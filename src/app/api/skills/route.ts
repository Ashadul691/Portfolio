import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  await connectDB();
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  return NextResponse.json({ skills });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const body = await req.json();
  const skill = await Skill.create(body);
  return NextResponse.json({ skill }, { status: 201 });
}
