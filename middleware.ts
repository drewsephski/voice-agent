import { clerkMiddleware } from "@clerk/nextjs/server";

// Basic route protection:
// - Public: marketing + auth pages
// - Protected by default: /dashboard (and any future app pages not listed as public)
export default clerkMiddleware();

// Configure which routes Clerk runs on and which are public
export const config = {
  matcher: [
    // Run Clerk on all routes except static assets and Next internals
    "/((?!_next|.*\\..*).*)",
    // Include API routes (optional, safe to keep for future use)
    "/(api|trpc)(.*)",
  ],
  publicRoutes: [
    "/",
    "/about",
    "/features",
    "/pricing",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/checkout/success",
    "/checkout/error",
  ],
};