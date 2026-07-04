import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin_token";
const SESSION_VALUE = "portfolio-admin-authenticated";
const JWT_SECRET = process.env.JWT_SECRET as string;

export function signAdminToken() {
  return SESSION_VALUE;
}

export function verifyAdminToken(token: string): boolean {
  if (token === SESSION_VALUE) return true;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

/** Server-side helper: is the current request authenticated as admin? */
export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}
