import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // If the secret query parameter is present, allow access to the normal home page
  if (secret === process.env.SECRET) {
    return NextResponse.next();
  }

  // Otherwise, rewrite the request to the "we are closed" page
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/closed", request.url));
  }
}

export const config = {
  matcher: ["/", "/closed"],
};
