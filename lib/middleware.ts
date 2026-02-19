import { NextResponse } from "next/server";

export function middleware(request: any) {
  const path = request.nextUrl.pathname;

  // allow public routes
  if (path === "/" || path === "/login") {
    return NextResponse.next();
  }

  // protect dashboard only
  if (path.startsWith("/dashboard")) {
    const isLoggedIn = false; // your auth check

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
