// DATA is free and open source (Apache-2.0). The installers are distributed as
// GitHub Release assets — GitHub hosts the bandwidth for free, so the storefront
// links straight to them (no Vercel Blob, no paid gate). Payment is now purely a
// "name your price" tip that supports development; the download never depends on it.
//
// New release checklist (keep this the ONLY place the version lives):
//   1. gh release create vX.Y.Z <exe> <zip>  on huntermixhunter/D.A.T.A
//   2. bump DATA_VERSION + the two asset filenames below
// That is the whole storefront-side change per release.

export const DATA_REPO_URL = "https://github.com/huntermixhunter/D.A.T.A";
export const DATA_RELEASES_URL = `${DATA_REPO_URL}/releases`;
export const DATA_LATEST_URL = `${DATA_REPO_URL}/releases/latest`;

export const DATA_VERSION = "v1.0.49";

const RELEASE_BASE = `${DATA_REPO_URL}/releases/download/${DATA_VERSION}`;

// Direct-download asset URLs on the GitHub Release. Public, free, permanent for
// this version. The .zip is the cross-platform build (Windows / macOS / Linux);
// the .exe is the one-click Windows installer.
export const DATA_EXE_URL = `${RELEASE_BASE}/DATA-Setup-${DATA_VERSION}.exe`;
export const DATA_ZIP_URL = `${RELEASE_BASE}/DATA-${DATA_VERSION}.zip`;
