// Publishes each entry's standalone HTML app at its `app.path`, e.g.
// content/apps/quizaconda.html -> /quizaconda/index.html.
import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { apps } from "../lib/entries";

export const getStaticPaths = (async () =>
  (await apps()).flatMap(({ app }) => {
    const dir = app.path.slice(1, -1);
    const props = { source: app.source };
    return [
      // The built file: dist/<dir>/index.html, which Cloudflare serves at /<dir>/.
      { params: { app: `${dir}/index.html` }, props },
      // The dev server does not map /<dir>/ to index.html for endpoints, so serve it directly there too.
      ...(import.meta.env.DEV ? [{ params: { app: dir }, props }] : []),
    ];
  })) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await readFile(props.source as string), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
