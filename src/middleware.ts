// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { parse } from "cookie";

// // List all public (non-protected) paths here
// const publicPaths = ["/auth", "/auth/login", "/auth/register"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Check for auth cookie
//   const cookies = parse(req.headers.get("cookie") || "");
//   const authUser = cookies["authUser"];

//   // If the path is public
//   if (publicPaths.some(path => pathname.startsWith(path))) {
//     // If already authorized, redirect to dashboard
//     if (authUser) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//     // Otherwise, allow
//     return NextResponse.next();
//   }

//   // If the path is protected and not authorized, redirect to login
//   if (!authUser) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // Otherwise, allow
//   return NextResponse.next();
// }

// // Only match protected routes (as seen in the browser URL)
// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/dashboard-analytics/:path*",
//     "/dashboard-blog/:path*",
//     "/dashboard-crm/:path*",
//     "/dashboard-job/:path*",
//     "/dashboard-nft/:path*",
//     "/dashboard-projects/:path*",
//     "/profile/:path*",
//     "/profile-settings/:path*",
//     "/starter/:path*",
//     "/terms-condition/:path*",
//     "/privacy-policy/:path*",
//     "/search-results/:path*",
//     "/gallery/:path*",
//     "/pricing/:path*",
//     "/faqs/:path*",
//     "/timeline/:path*",
//     "/team/:path*",
//     // Add more as needed
//   ],
// };

// import { NextResponse, type NextRequest } from "next/server";
// import { auth0 } from "src/lib/auth0";

// // export async function middleware(request: NextRequest) {
// //   const { pathname } = request.nextUrl;

// //   if (
// //     pathname.startsWith("/_next/") ||
// //     pathname.startsWith("/favicon.ico") ||
// //     pathname.startsWith("/sitemap.xml") ||
// //     pathname.startsWith("/robots.txt") ||
// //     pathname.startsWith("/auth/")
// //   ) {
// //     return NextResponse.next();
// //   }
// //   console.log({ pathname });
// //   return await auth0.middleware(request);
// // }

// export async function middleware(request: NextRequest) {
//   console.log("Middleware running for: ", request.nextUrl.pathname);
//   console.log({ request });
//   if (request.nextUrl.pathname.startsWith("/auth")) {
//     console.log("Middleware auth route: ", request.nextUrl.pathname);
//   }

//   return await auth0.middleware(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

import { createOryMiddleware } from "@ory/nextjs/middleware";
import oryConfig from "./ory.config";

// This function can be marked `async` if using `await` inside
export const middleware = createOryMiddleware(oryConfig);

// See "Matching Paths" below to learn more
export const config = {};
