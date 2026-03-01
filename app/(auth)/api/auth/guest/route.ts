import { NextResponse } from "next/server";
import { encode, getToken } from "next-auth/jwt";
import { isDevelopmentEnvironment } from "@/lib/constants";
import { createGuestUser } from "@/lib/db/queries";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/dashboard";
  const authSecret = process.env.AUTH_SECRET;

  if (!authSecret) {
    return NextResponse.json(
      { error: "Authentication is not configured." },
      { status: 500 }
    );
  }

  const token = await getToken({
    req: request,
    secret: authSecret,
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
    secret: authSecret,
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
