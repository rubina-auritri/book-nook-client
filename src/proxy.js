import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Private routes
  const protectedRoutes = [
    "/AddBook",
    "/MyBooks",
    "/MyBorrows",
    "/edit-book"
  ];

  const requiresLogin = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  // Check Better Auth session cookie
  const cookies = request.cookies.getAll();

  const sessionCookie = cookies.some(
    ({ name }) =>
      name === "better-auth.session_token" ||
      name === "__Secure-better-auth.session_token"
  );

  // Redirect unauthenticated users
  if (requiresLogin && !sessionCookie) {
    const loginUrl = new URL("/sign-in", request.url);

    loginUrl.searchParams.set(
      "callbackURL",
      `${pathname}${search}`
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/AddBook/:path*",
    "/MyBooks/:path*",
    "/MyBorrows/:path*",
    "/edit-book/:path*"
  ],
};