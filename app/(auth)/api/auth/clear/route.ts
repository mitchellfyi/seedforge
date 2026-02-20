import { NextResponse } from "next/server";

export async function GET() {
  const html = `<html><body><h1>Cookies cleared</h1><a href="/">Go to homepage</a></body></html>`;
  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });

  for (const name of [
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "authjs.callback-url",
    "authjs.csrf-token",
  ]) {
    response.cookies.set(name, "", { maxAge: 0, path: "/" });
  }

  return response;
}
