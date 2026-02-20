import { NextResponse } from "next/server";
import { getToken, encode } from "next-auth/jwt";
import { createGuestUser } from "@/lib/db/queries";
import { isDevelopmentEnvironment } from "@/lib/constants";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/dashboard";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const [guestUser] = await createGuestUser();

  const cookieName = isDevelopmentEnvironment
    ? "authjs.session-token"
    : "__Secure-authjs.session-token";

  const sessionToken = await encode({
    token: {
      email: guestUser.email,
      sub: guestUser.id,
      id: guestUser.id,
      type: "guest",
    },
    secret: process.env.AUTH_SECRET!,
    salt: cookieName,
    maxAge: SESSION_MAX_AGE,
  });

  const response = NextResponse.redirect(new URL(redirectUrl, request.url));
  response.cookies.set(cookieName, sessionToken, {
    httpOnly: true,
    secure: !isDevelopmentEnvironment,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
