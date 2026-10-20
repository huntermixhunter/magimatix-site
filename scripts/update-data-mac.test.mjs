import assert from "node:assert/strict";
import test from "node:test";
import { validateMacRelease, updateReleaseSource, verifyPublishedMacRelease } from "./update-data-mac.mjs";

const version = "v1.0.57";
const commit = "a".repeat(40);
const hash = "b".repeat(64);
const base = `https://github.com/huntermixhunter/D.A.T.A/releases/download/${version}`;
const dmgNames = ["arm64", "x86_64"].map((arch) => `DATA-${version}-${arch}.dmg`);
function release() {
  return {
    tag_name: version, draft: false, prerelease: false,
    assets: [...dmgNames, ...dmgNames.map((name) => `${name}.build.json`), "SHA256SUMS-mac.txt"].map((name) => ({
      name, state: "uploaded", size: 100, digest: `sha256:${hash}`, browser_download_url: `${base}/${name}`,
    })),
  };
}
function fakeFetch(overrides = {}) {
  return async (url, options) => {
    if (overrides[url]) return overrides[url](options);
    if (url.includes("/releases/tags/")) return Response.json(release());
    if (url.includes("/git/ref/tags/")) return Response.json({ object: { type: "commit", sha: commit } });
    if (url.endsWith("SHA256SUMS-mac.txt")) return new Response(dmgNames.map((name) => `${hash}  ${name}`).join("\n"));
    if (url.endsWith(".build.json")) return Response.json({ version: version.slice(1), commit, architecture: url.includes("-arm64.") ? "arm64" : "x86_64" });
    if (options.method === "HEAD" && url.endsWith(".dmg")) return new Response(null, { status: 200 });
    throw new Error(`Unexpected request: ${url}`);
  };
}

test("accepts both complete processor downloads", () => {
  assert.equal(validateMacRelease(release(), version).names.length, 2);
});
for (const field of ["draft", "prerelease"]) {
  test(`refuses a ${field} release`, () => {
    assert.throws(() => validateMacRelease({ ...release(), [field]: true }, version), /published/);
  });
}
for (const name of [...dmgNames, "SHA256SUMS-mac.txt"]) {
  test(`refuses missing ${name}`, () => {
    const value = release();
    value.assets = value.assets.filter((asset) => asset.name !== name);
    assert.throws(() => validateMacRelease(value, version), /Missing/);
  });
}
test("refuses an asset without a GitHub integrity digest", () => {
  const value = release();
  value.assets[0].digest = null;
  assert.throws(() => validateMacRelease(value, version), /SHA256/);
});
test("refuses an asset URL from another repository", () => {
  const value = release();
  value.assets[0].browser_download_url = "https://example.com/file.dmg";
  assert.throws(() => validateMacRelease(value, version), /Unexpected asset URL/);
});
test("changes only the Mac version and layout", () => {
  const source = 'export const DATA_VERSION = "v1.0.56";\nexport const DATA_MAC_VERSION = "v1.0.51";\nexport const DATA_MAC_SPLIT_DOWNLOADS = false;\n';
  const result = updateReleaseSource(source, version);
  assert.ok(result.includes('DATA_VERSION = "v1.0.56"'));
  assert.ok(result.includes(`DATA_MAC_VERSION = "${version}"`));
  assert.ok(result.includes("DATA_MAC_SPLIT_DOWNLOADS = true"));
  assert.equal(updateReleaseSource(result, version), result);
  assert.throws(() => updateReleaseSource("unexpected file", version), /Unexpected/);
});
test("verifies provenance, checksums and reachable downloads", async () => {
  assert.equal((await verifyPublishedMacRelease(version, fakeFetch())).tag_name, version);
});
test("refuses checksum disagreement", async () => {
  await assert.rejects(verifyPublishedMacRelease(version, fakeFetch({
    [`${base}/SHA256SUMS-mac.txt`]: () => new Response(dmgNames.map((name) => `${"c".repeat(64)}  ${name}`).join("\n")),
  })), /Checksum mismatch/);
});
test("refuses build from another source commit", async () => {
  await assert.rejects(verifyPublishedMacRelease(version, fakeFetch({
    [`${base}/${dmgNames[0]}.build.json`]: () => Response.json({ version: version.slice(1), architecture: "arm64", commit: "d".repeat(40) }),
  })), /provenance/);
});
test("refuses a download that returns 404", async () => {
  await assert.rejects(verifyPublishedMacRelease(version, fakeFetch({
    [`${base}/${dmgNames[1]}`]: () => new Response(null, { status: 404 }),
  })), /HTTP 404/);
});
test("rejects malformed versions before making requests", async () => {
  await assert.rejects(verifyPublishedMacRelease("../main", () => { throw new Error("Must not fetch"); }), /Version/);
});
