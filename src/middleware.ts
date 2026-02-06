// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Logout no va aca
// Rutas públicas de tu app
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/confirm-account",
  "/auth/forgot-password",
  "/auth/reset-password",
];

// Rutas/archivos que no bloqueamos
const ignoredPaths = [
  "/_next",
  "/static",
  "/favicon.ico",
  "/images",
  // "/robots.txt",
  // "/sitemap.xml",
];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Ignorar assets, archivos públicos y rutas de Next
  if (ignoredPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.includes(path);

  // Si es pública pero ya estás logueado → redirige a app
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(
      new URL("/apps-job-companies-lists", req.nextUrl)
    );
  }

  // Si NO es pública y NO hay tokens → redirige a login
  // Si hay refreshToken pero no accessToken → no bloquea, frontend puede renovarlo
  if (!isPublicRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Si hay accessToken o refreshToken → permitir pasar
  return NextResponse.next();
}
