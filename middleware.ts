import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the URL contains /projects/undefined/
  if (
    request.nextUrl.pathname.includes("/projects/undefined/") ||
    request.nextUrl.pathname === "/projects/undefined"
  ) {
    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/:path*"],
};
