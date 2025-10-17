// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

const publicPaths = ["/auth/login", "/auth/register", "/auth/confirm-account"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("1:", { pathname });
  const cookies = parse(req.headers.get("cookie") || "");
  const accessToken = cookies["accessToken"];
  console.log({ accessToken });
  // Ruta pública
  if (publicPaths.some(path => pathname.startsWith(path))) {
    if (accessToken) {
      // Ya autenticado, redirigir a la página principal de la app
      return NextResponse.redirect(
        new URL("/apps-job-companies-lists", req.url)
      );
    }
    return NextResponse.next(); // permitir si no hay token
  }

  // Ruta privada
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // permitir si hay token
}

export const config = {
  matcher: ["/((?!auth).*)"], // todas las rutas que no empiecen con /auth
};
