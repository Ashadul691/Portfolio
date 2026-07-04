
import { isAuthenticated } from "@/lib/auth";
import { sendContactEmail } from "@/lib/mail";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextRequest, NextResponse } from "next/server";

// POST /api/messages -> visitor submits the contact form (public)
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const message = await Message.create(body);

  // Email is best-effort: if it fails, the message is still saved to the
  // dashboard, so we don't fail the request over an email hiccup.
  try {
    await sendContactEmail(body);
  } catch (err) {
    console.error("Failed to send contact email:", err);
  }

  return NextResponse.json({ message }, { status: 201 });
}

// GET /api/messages -> admin views inbox
export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json({ messages });
}
