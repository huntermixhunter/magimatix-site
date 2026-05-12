import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "magimatix.com";
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // 1. Redirect www → non-www (permanent 308)
  if (hostname === `www.${CANONICAL_HOST}`) {
    return NextResponse.redirect(
      `${CANONICAL_ORIGIN}${pathname}${search}`,
      308
    );
  }

  // 2. For non-canonical hosts (e.g. *.vercel.app preview/alias URLs),
  //    add X-Robots-Tag: noindex so Google does not index them
  if (hostname !== CANONICAL_HOST) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static assets and internal Next.js paths
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
