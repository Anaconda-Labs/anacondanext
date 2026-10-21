// One collection, one markdown file per item in content/ (repo root).
//
// A file has up to five optional sections, and at least one is required. Which
// sections a file has decides where the item appears:
//   experiment   -> experiments grid on the home page
//   research     -> research portfolio on the home page
//   partnership  -> partnership explorations on the home page
//   writeup      -> writing lists, plus its own page built from the markdown body
//   app          -> a standalone HTML file from content/apps/, published at its own path
//
// Ordering is not set in content. Each list sorts by its section's `date`
// (see src/lib/entries.ts). Text fields marked "markdown" are rendered with
// Astro's markdown pipeline by the loader below, the same way bodies are.
//
// A missing or misspelled field fails `astro build` with the file name and field.
import { existsSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({
  href: z.string(),
  label: z.string(),
});

/** Paths the site's own pages use; an app may not be published there. */
const reservedPaths = ["/", "/writing/", "/404.html", "/_astro/", "/assets/"];

const experiment = z.object({
  /** Overrides the entry title on the card. */
  title: z.string().optional(),
  /** Cards are listed oldest first. */
  date: z.coerce.date(),
  /** Emoji shown in the card's icon square. */
  glyph: z.string(),
  status: z.object({
    label: z.string(),
    /** Colour of the status pill: ship = lime, cont = teal, stop = amber, idea = grey. */
    kind: z.enum(["ship", "cont", "stop", "idea"]),
  }),
  /** Extra grey pills after the status. */
  pills: z.array(z.string()).default([]),
  /**
   * Makes the whole card a link, with `label` shown as "label ▸". `href` may be
   * left out when the entry has an `app`; the card then links to the app.
   */
  link: link.partial({ href: true }).optional(),
  /** Games get a brighter hover border. */
  playable: z.boolean().default(false),
  /** Card text. Markdown. */
  blurb: z.string(),
});

const research = z.object({
  /** Overrides the entry title on the decision. */
  title: z.string().optional(),
  /** Decisions are listed oldest first. */
  date: z.coerce.date(),
  verdict: z.object({
    label: z.string(),
    /** Colour of the verdict pill: transfer = lime, continue = teal, defer = amber. */
    kind: z.enum(["transfer", "continue", "defer"]),
  }),
  /** Markdown. */
  text: z.string(),
});

const partnership = z.object({
  /** Overrides the entry title. Partnerships are listed by title. */
  title: z.string().optional(),
  /** Emoji or symbol shown before the title. */
  chip: z.string(),
  /** The "Next:" line under the text. */
  next: z.string(),
  /** Markdown. */
  text: z.string(),
});

const writeup = z.object({
  /** Overrides the entry title on cards and the article page. */
  title: z.string().optional(),
  /** Write-ups are listed newest first. Not needed when `soon` is set. */
  date: z.coerce.date().optional(),
  /** Short text for cards on the home page and the writing index. Markdown. */
  summary: z.string(),
  /**
   * A planned piece with no article yet: listed as "Coming soon" after the
   * dated write-ups, and no page is built.
   */
  soon: z.boolean().default(false),
  /** Shown after the date above the title, e.g. "Build notes". */
  format: z.string().optional(),
  /** Meta description for search and link previews. Defaults to the summary. */
  description: z.string().optional(),
  /** Opening paragraph under the title. Markdown. */
  lede: z.string().optional(),
  /** Facts row under the lede, e.g. { label: Team, value: Anaconda Incubation }. */
  byline: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  /** Highlighted nav button. Defaults to "Play something". */
  cta: link.optional(),
});

/** Take a standalone HTML file and publish it at `path`. */
const app = z.object({
  /** The HTML file, relative to this .md file, e.g. ./apps/quizaconda.html. */
  source: z.string(),
  /** Where it is published, e.g. /quizaconda/ (served as /quizaconda/index.html). */
  path: z
    .string()
    .regex(/^\/[a-z0-9-]+(\/[a-z0-9-]+)*\/$/, "Use a path like /name/ (lowercase letters, digits, dashes).")
    .refine((p) => !reservedPaths.some((r) => p === r || (r !== "/" && p.startsWith(r))), {
      message: `This path belongs to the site: ${reservedPaths.join(", ")}`,
    }),
});

/** Parked: the large panel above the experiment cards. At most one entry should set it. */
const featured = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  /** Section intro. Markdown. */
  intro: z.string(),
  tag: z.string(),
  panelTitle: z.string(),
  /** Panel text. Markdown. */
  text: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  actions: z.array(
    link.extend({
      style: z.enum(["primary", "ghost"]).default("primary"),
      external: z.boolean().default(false),
    }),
  ),
});

const schema = z
  .object({
    title: z.string(),
    /**
     * Sets the write-up page URL (/writing/<slug>.html) when it should differ
     * from the file name.
     */
    slug: z.string().optional(),
    experiment: experiment.optional(),
    research: research.optional(),
    partnership: partnership.optional(),
    writeup: writeup.optional(),
    app: app.optional(),
    featured: featured.optional(),
  })
  .refine((e) => e.experiment || e.research || e.partnership || e.writeup || e.app, {
    message: "Add at least one section: experiment, research, partnership, writeup or app.",
  })
  .refine((e) => !e.experiment?.link || e.experiment.link.href || e.app, {
    message: "experiment.link needs an href, unless the entry has an app to link to.",
    path: ["experiment", "link", "href"],
  });

type Entry = z.infer<typeof schema>;
type Render = (markdown: string) => Promise<string>;

/** Renders one paragraph without its <p> wrapper, for text placed inside an existing element. */
const inline = async (render: Render, markdown: string) =>
  (await render(markdown)).trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1");

/** Replaces each markdown text field with its rendered HTML. */
async function renderFields(entry: Entry, render: Render): Promise<Entry> {
  const { experiment, research, partnership, writeup, featured } = entry;
  if (experiment) experiment.blurb = await render(experiment.blurb);
  if (research) research.text = await render(research.text);
  if (partnership) partnership.text = await render(partnership.text);
  if (writeup) {
    writeup.summary = await inline(render, writeup.summary);
    if (writeup.lede) writeup.lede = await inline(render, writeup.lede);
  }
  if (featured) {
    featured.intro = await inline(render, featured.intro);
    featured.text = await render(featured.text);
  }
  return entry;
}

/**
 * Checks that an app's source file exists and rewrites `source` to a path from
 * the project root, so the publishing endpoint can read it.
 */
function resolveAppSource(entry: Entry, filePath: string | undefined) {
  if (!entry.app || !filePath) return;
  const file = resolve(dirname(filePath), entry.app.source);
  if (!existsSync(file)) {
    throw new Error(`${filePath}: app.source "${entry.app.source}" does not exist (looked for ${file}).`);
  }
  entry.app.source = relative(process.cwd(), file);
}

/** glob() over content/, with markdown front matter fields rendered after validation. */
function entriesLoader(): Loader {
  const files = glob({ pattern: "*.md", base: "./content" });
  return {
    name: "entries",
    load: (context) =>
      files.load({
        ...context,
        parseData: async (props) => {
          const data = await context.parseData(props);
          resolveAppSource(data as Entry, props.filePath);
          const render: Render = async (markdown) => (await context.renderMarkdown(markdown)).html;
          return (await renderFields(data as Entry, render)) as typeof data;
        },
      }),
  };
}

const entries = defineCollection({ loader: entriesLoader(), schema });

export const collections = { entries };
