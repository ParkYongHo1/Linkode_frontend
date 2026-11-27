import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/shared/api/supabase/proxy";

const GUEST_ONLY_PATHS = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { response, isLoggedIn } = await updateSession(request);

  if (isLoggedIn && GUEST_ONLY_PATHS.includes(request.nextUrl.pathname)) {
    const redirectResponse = NextResponse.redirect(new URL("/", request.url));

    response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)"],
};
