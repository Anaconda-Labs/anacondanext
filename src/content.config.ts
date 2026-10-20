// Content collections: one markdown file per item, validated at build time.
// A missing or misspelled field fails `astro build` with the file name and field.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({
  href: z.string(),
  label: z.string(),
});

/** Home page experiments. The body is the card blurb (markdown). */
const experiments = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiments" }),
  schema: z.object({
    title: z.string(),
    /** Position on the home page, lowest first. */
    order: z.number(),
    /** Emoji shown in the card's icon square. */
    glyph: z.string(),
    status: z.object({
      label: z.string(),
      /** Colour of the status pill: ship = lime, cont = teal, stop = amber, idea = grey. */
      kind: z.enum(["ship", "cont", "stop", "idea"]),
    }),
    /** Extra grey pills after the status. */
    pills: z.array(z.string()).default([]),
    /** Makes the whole card a link, with `label` shown as "label ▸". */
    link: link.optional(),
    /** Games get a brighter hover border. */
    playable: z.boolean().default(false),
    /**
     * Shows this experiment as the large featured panel above the cards instead
     * of as a card. At most one experiment should set it.
     */
    featured: z
      .object({
        eyebrow: z.string(),
        heading: z.string(),
        /** Section intro. Inline HTML allowed (e.g. <strong>). */
        intro: z.string(),
        tag: z.string(),
        panelTitle: z.string(),
        stats: z.array(z.object({ value: z.string(), label: z.string() })),
        actions: z.array(
          link.extend({
            style: z.enum(["primary", "ghost"]).default("primary"),
            external: z.boolean().default(false),
          }),
        ),
      })
      .optional(),
  }),
});

/** Research portfolio decisions. The body is the explanation (markdown). */
const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    verdict: z.object({
      label: z.string(),
      /** Colour of the verdict pill: transfer = lime, continue = teal, defer = amber. */
      kind: z.enum(["transfer", "continue", "defer"]),
    }),
  }),
});

/** Partnership explorations. The body is the description (markdown). */
const partners = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/partners" }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    /** Emoji or symbol shown before the name. */
    chip: z.string(),
    /** The "Next:" line under the description. */
    next: z.string(),
  }),
});

/**
 * Write-ups. The file name is the URL: writing/foo.md is served at
 * /writing/foo.html. The body is the article (markdown; raw HTML allowed).
 */
const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    /** Position in writing lists, lowest first. */
    order: z.number(),
    /** Date as displayed, e.g. "September 2026" or "September 10, 2026". */
    when: z.string(),
    /** Short text for cards on the home page and the writing index. Inline HTML allowed. */
    summary: z.string(),
    /**
     * A planned piece with no article yet: listed as "Coming soon", no page is
     * built, and only title, order and summary are needed.
     */
    soon: z.boolean().default(false),
    /** Shown after the date above the title, e.g. "Build notes". */
    kind: z.string().optional(),
    /** Meta description for search and link previews. */
    description: z.string().optional(),
    /** Opening paragraph under the title. Inline HTML allowed (links, <code>, <strong>). */
    lede: z.string().optional(),
    /** Facts row under the lede, e.g. { label: Team, value: Anaconda Incubation }. */
    byline: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    /** Highlighted nav button. Defaults to "Play something". */
    cta: link.optional(),
  }),
});

export const collections = { experiments, research, partners, writing };
