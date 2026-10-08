// DATA is free and open source (Apache-2.0). The installers are distributed as
// GitHub Release assets: GitHub hosts the bandwidth for free, so the storefront
// links straight to them (no Vercel Blob, no paid gate). Payment is now purely a
// "name your price" tip that supports development; the download never depends on it.
//
// New release checklist (keep this the ONLY place the versions live):
//   1. gh release create vX.Y.Z <exe> <zip> [dmg]  on huntermixhunter/D.A.T.A
//   2. bump DATA_VERSION below, and DATA_MAC_VERSION only if that cut
//      actually shipped a .dmg (see the note on it).
// That is the whole storefront-side change per release.

export const DATA_REPO_URL = "https://github.com/huntermixhunter/D.A.T.A";
export const DATA_RELEASES_URL = `${DATA_REPO_URL}/releases`;
export const DATA_LATEST_URL = `${DATA_REPO_URL}/releases/latest`;

// The current release for the Windows installer and the cross-platform zip.
// Both are built on Windows (tools\build_installer.ps1, tools\release.ps1), so
// they ship together on every cut.
export const DATA_VERSION = "v1.0.55";

// The .dmg has to be built on a Mac, so it does NOT ship on every cut. Pinning
// it separately keeps the Mac button pointing at the newest release that
// actually has a .dmg asset instead of 404-ing on a Windows-only version.
// Bump this to match DATA_VERSION the next time a cut includes a .dmg.
export const DATA_MAC_VERSION = "v1.0.51";

const releaseBase = (version: string) =>
  `${DATA_REPO_URL}/releases/download/${version}`;

// Direct-download asset URLs on the GitHub Release. Public, free, permanent for
// this version. The .zip is the cross-platform build (Windows / macOS / Linux);
// the .exe is the one-click Windows installer; the .dmg is the macOS installer.
export const DATA_EXE_URL = `${releaseBase(DATA_VERSION)}/DATA-Setup-${DATA_VERSION}.exe`;
export const DATA_ZIP_URL = `${releaseBase(DATA_VERSION)}/DATA-${DATA_VERSION}.zip`;
export const DATA_DMG_URL = `${releaseBase(DATA_MAC_VERSION)}/DATA-${DATA_MAC_VERSION}.dmg`;
