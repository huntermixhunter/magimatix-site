// Download redirect for DATA. The product is free and open source, so there is no
// payment gate anymore: this route simply forwards to the public GitHub Release
// asset for the requested format. It exists so older links (emails, the thank-you
// page, anything using /api/download?format=...) keep resolving to the current
// build without hard-coding version numbers at the call site.
import { NextResponse } from "next/server";
import { DATA_EXE_URL, DATA_ZIP_URL } from "@/lib/data-release";

export const runtime = "nodejs";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  // The .exe is the Windows one-click installer; everything else gets the
  // cross-platform .zip. Mac now has native disk images too, but they are
  // architecture-specific (arm64 and x86_64) so there is no single .dmg this
  // route could redirect to. The download panel offers both directly from
  // DATA_MAC_DOWNLOADS; the .zip stays the right fallback for a bare link.
  const target = format === "installer" ? DATA_EXE_URL : DATA_ZIP_URL;

  return NextResponse.redirect(target, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
