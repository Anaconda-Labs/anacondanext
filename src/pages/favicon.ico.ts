// Serves the site icon (the logo) at /favicon.ico for pages without a <link rel="icon">,
// such as the standalone apps. Astro pages link the icon from src/assets directly.
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";

export const GET: APIRoute = async () =>
  new Response(await readFile("src/assets/incubation-logo.png"), { headers: { "Content-Type": "image/png" } });
