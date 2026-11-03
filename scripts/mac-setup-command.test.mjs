// Guards the Mac tab of the download page: the Terminal command it shows must be
// exactly the one in the downloadable Mac setup guide, so the two never drift.
// Run with: node --test scripts/mac-setup-command.test.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the Mac download tab and DATA-Mac-Setup.txt share one Terminal command", async () => {
  const source = await readFile(new URL("src/lib/data-release.ts", root), "utf8");
  const guide = await readFile(new URL("public/downloads/DATA-Mac-Setup.txt", root), "utf8");
  const match = /export const DATA_MAC_TERMINAL_COMMAND =\s*'([^']+)';/.exec(source);
  assert.ok(match, "DATA_MAC_TERMINAL_COMMAND was not found in src/lib/data-release.ts");
  const guideLines = guide.split(/\r?\n/).map((line) => line.trim());
  assert.ok(
    guideLines.includes(match[1]),
    "public/downloads/DATA-Mac-Setup.txt does not contain the exact command shown on the Mac tab",
  );
});
