// Module resolution for scripts/stripe-product.test.mjs only. Resolves the "@/"
// alias the way tsconfig.json does, swaps src/lib/stripe.ts and src/lib/email.ts
// for the in-memory fakes, and points next/server at this checkout's
// node_modules (Next.js has no package "exports" map, so plain ESM resolution
// cannot find it, and a copy of src/ outside this folder would not either).
const FAKED = new Set(["@/lib/stripe", "@/lib/email"]);

let srcRoot;
let fakesUrl;
let nextServerUrl;

export async function initialize(data) {
  ({ srcRoot, fakesUrl, nextServerUrl } = data);
}

export async function resolve(specifier, context, nextResolve) {
  if (FAKED.has(specifier)) return { url: fakesUrl, shortCircuit: true };
  if (specifier.startsWith("@/")) {
    return {
      url: new URL(`${specifier.slice(2)}.ts`, srcRoot).href,
      format: "module-typescript",
      shortCircuit: true,
    };
  }
  if (specifier === "next/server") return { url: nextServerUrl, shortCircuit: true };
  // The source files are ES modules written in TypeScript; say so up front
  // rather than have Node guess from package.json, which has no "type".
  if (specifier.startsWith("file:") && specifier.endsWith(".ts")) {
    return { url: specifier, format: "module-typescript", shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
