// Verify a public Mac release before changing the storefront. Never deploys.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const repo = "huntermixhunter/D.A.T.A";
const api = `https://api.github.com/repos/${repo}`;
const sourceFile = new URL("../src/lib/data-release.ts", import.meta.url);

export function validateMacRelease(release, version) {
  if (!/^v\d+\.\d+\.\d+$/.test(version)) throw new Error("Version must look like v1.0.57");
  if (release.tag_name !== version || release.draft || release.prerelease)
    throw new Error("Use a published, stable release with the requested tag");
  const names = ["arm64", "x86_64"].map((arch) => `DATA-${version}-${arch}.dmg`);
  const required = [...names, ...names.map((name) => `${name}.build.json`), "SHA256SUMS-mac.txt"];
  const assets = new Map((release.assets ?? []).map((asset) => [asset.name, asset]));
  for (const name of required) {
    const asset = assets.get(name);
    if (!asset || asset.state !== "uploaded" || asset.size <= 0)
      throw new Error(`Missing or incomplete release asset: ${name}`);
    const expected = `https://github.com/${repo}/releases/download/${version}/${name}`;
    if (asset.browser_download_url !== expected) throw new Error(`Unexpected asset URL: ${name}`);
  }
  for (const name of names) {
    if (!/^sha256:[a-f0-9]{64}$/.test(assets.get(name).digest ?? ""))
      throw new Error(`GitHub has no SHA256 digest for ${name}`);
  }
  return { names, assets };
}

export function updateReleaseSource(source, version) {
  if (!/^v\d+\.\d+\.\d+$/.test(version)) throw new Error("Invalid version");
  const versionPattern = /export const DATA_MAC_VERSION = "v\d+\.\d+\.\d+";/g;
  const layoutPattern = /export const DATA_MAC_SPLIT_DOWNLOADS = (?:true|false);/g;
  if ((source.match(versionPattern) ?? []).length !== 1 || (source.match(layoutPattern) ?? []).length !== 1)
    throw new Error("Unexpected release constants. Review the file manually.");
  return source.replace(versionPattern, `export const DATA_MAC_VERSION = "${version}";`)
    .replace(layoutPattern, "export const DATA_MAC_SPLIT_DOWNLOADS = true;");
}

export async function verifyPublishedMacRelease(version, fetcher = fetch) {
  if (!/^v\d+\.\d+\.\d+$/.test(version)) throw new Error("Version must look like v1.0.57");
  async function get(url, method = "GET") {
    const response = await fetcher(url, {
      method,
      headers: { "User-Agent": "Magimatix-Mac-release-check" },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response;
  }
  const release = await (await get(`${api}/releases/tags/${version}`)).json();
  const { names, assets } = validateMacRelease(release, version);
  let object = (await (await get(`${api}/git/ref/tags/${version}`)).json()).object;
  if (object.type === "tag") object = (await (await get(`${api}/git/tags/${object.sha}`)).json()).object;
  if (object.type !== "commit" || !/^[a-f0-9]{40}$/.test(object.sha)) throw new Error("Tag must resolve to a commit");
  const sums = await (await get(assets.get("SHA256SUMS-mac.txt").browser_download_url)).text();
  const hashes = new Map(sums.trim().split(/\r?\n/).map((line) => {
    const match = /^([a-f0-9]{64})\s+\*?([^\s]+)$/.exec(line);
    if (!match) throw new Error("Invalid checksum manifest");
    return [match[2], match[1]];
  }));
  for (const name of names) {
    const asset = assets.get(name);
    if (`sha256:${hashes.get(name)}` !== asset.digest) throw new Error(`Checksum mismatch: ${name}`);
    const build = await (await get(assets.get(`${name}.build.json`).browser_download_url)).json();
    const arch = name.includes("-arm64.") ? "arm64" : "x86_64";
    if (build.commit !== object.sha || build.version !== version.slice(1) || build.architecture !== arch)
      throw new Error(`Build provenance does not match the tag: ${name}`);
    await get(asset.browser_download_url, "HEAD");
  }
  return release;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const version = process.argv[2] ?? "";
    if (process.argv.length !== 3) throw new Error("Usage: node scripts/update-data-mac.mjs vX.Y.Z");
    await verifyPublishedMacRelease(version);
    const source = await readFile(sourceFile, "utf8");
    await writeFile(sourceFile, updateReleaseSource(source, version), "utf8");
    console.log(`Verified both Mac DMGs and updated ${fileURLToPath(sourceFile)} to ${version}.`);
    console.log("Windows/ZIP version preserved. Review, test, commit, and deploy when authorized.");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
