// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://anacondanext.com",
  // Emit writing/foo.html rather than writing/foo/index.html, so existing
  // page URLs keep working.
  build: { format: "file" },
  // Keep output whitespace as written while the port is in progress.
  compressHTML: false,
});
