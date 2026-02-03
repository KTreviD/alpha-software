// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/apps-job-companies-lists"];
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/confirm-account",
];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log("UESHOWWWWWWWWWW");
  console.log("MIDDLEWARE PATH1:", req.nextUrl.pathname);
  console.log("COOKIE accessToken1:", req.cookies.get("accessToken"));
  // Ignorar assets y _next
  if (
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    console.log("UIHHHHHHHHH AQUI ANDO");
    console.log("MIDDLEWARE PATH2:", req.nextUrl.pathname);
    console.log("COOKIE accessToken2:", req.cookies.get("accessToken"));
    return NextResponse.redirect(
      new URL("/apps-job-companies-lists", req.nextUrl)
    );
  }

  return NextResponse.next();
}
