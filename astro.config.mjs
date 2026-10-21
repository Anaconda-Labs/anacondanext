// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://anacondanext.com",
  // Emit writing/foo.html (not writing/foo/index.html) and writing/index.html, so existing
  // page URLs keep working.
  build: { format: "preserve" },
  // Keep output whitespace as written while the port is in progress.
  compressHTML: false,
});
