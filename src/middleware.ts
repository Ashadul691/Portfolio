import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "portfolio_admin_token";
const SESSION_VALUE = "portfolio-admin-authenticated";
const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (token === SESSION_VALUE) {
    return NextResponse.next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
    if (payload.role === "admin") {
      return NextResponse.next();
    }
  } catch {
    // fall through to redirect
  }

  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
