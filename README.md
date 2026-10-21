# anacondanext.com

The public site of the Anaconda Incubation team: experiments, research decisions,
partnership explorations, write-ups, and small standalone apps such as Quizaconda and
Condary. It is built with [Astro](https://astro.build) and deployed to Cloudflare. All
content is markdown in `content/`. The look, layout and navigation live in `src/`.

This README is written for people and for coding agents. `AGENTS.md` adds a short list
of rules for agents and points back here.

## Quick start

Use the Node version in `.nvmrc`.

```
npm ci            # once
npm run dev       # edit with live reload
npx wrangler dev  # optional: production-like check before a PR
```

- **`npm run dev`** runs `astro dev` at <http://localhost:4321>. It watches `content/`,
  `src/` and the config, and updates the open page when you save. Schema errors appear
  in the browser and the terminal. Use this while editing.
- **`npx wrangler dev`** builds the site the way CI does (it runs the `build.command` in
  `wrangler.jsonc`) and serves `dist/` with Cloudflare's runtime at
  <http://localhost:8787>. It reproduces production URL handling: `.html` redirects,
  trailing slashes and the 404 page. It builds once at startup and does not live-reload.
  Use it before opening a PR that touches routing or apps.
- **`npm run build`** runs `astro build` into `dist/`. It is what the two commands above
  call, and it runs every check listed under [Checks](#checks).

## Repository layout

```
content/              all content: one markdown file per item
  apps/               standalone HTML apps published by entries (see Apps)
  img/                images used by write-ups
src/
  content.config.ts   the content schema and the loader
  lib/entries.ts      lists of entries per section, and their ordering rules
  pages/              routes: home, writing index, write-up pages, apps, 404, favicon
  layouts/Base.astro  <head>, background, nav and footer slots for every page
  components/         Nav, Footer, Brand
  styles/site.css     the one stylesheet
  assets/             images used by the layout (the logo)
wrangler.jsonc        Cloudflare config, including the build command
.github/workflows/    deploy on push to main
```

A content change touches only `content/`. A change to `src/` is a change to the site
itself.

## Content model

Each file in `content/` is one item. Its front matter has up to five optional sections,
and at least one is required. Which sections a file has decides where the item appears.

| Section | Where the item appears |
| --- | --- |
| `experiment` | As a card in the experiments grid on the home page |
| `research` | As a decision in the research portfolio on the home page |
| `partnership` | In partnership explorations on the home page |
| `writeup` | In the writing lists (home page and `/writing/`), plus its own page built from the markdown body |
| `app` | A standalone HTML file published at its own path (see [Apps](#apps)) |

An item with several sections appears in several places. For example,
`metaflow-durability.md` is a card, a decision and a write-up.

Shared fields:

- **`title`** (required) is used by every section. Any section can override it with its
  own `title` when the wording differs, for example a decision titled
  "kilo.nvim → the Kilo organization".
- **`slug`** sets the write-up URL, `/writing/<slug>.html`, when it should differ from the
  file name. Without it, the file name is the URL.

Text fields marked "markdown" below are rendered with the same markdown pipeline as the
body: `*emphasis*`, `**bold**`, `` `code` ``, `[links](https://…)` and curly quotes all
work. Other fields are plain text.

The schema is in `src/content.config.ts`. Every field there has a comment saying what it
does.

## Adding content

Start from the existing file that matches what you are adding. Copy its structure, not
its content.

| To add | Start from | It shows |
| --- | --- | --- |
| An experiment with a decision and a write-up | `content/metaflow-durability.md` | All three sections, `slug`, code blocks, a table, an image, a callout |
| An app with its card and write-up | `content/condary.md` | `app`, a card linking to it, `cta`, callouts with several labels |
| A partnership with notes | `content/github.md` | `partnership`, `title` overrides, a table, a sources block |
| A card only | `content/kbench.md` | The smallest experiment |
| A decision only | `content/games-in-public.md` | The smallest research entry |
| A coming-soon piece | `content/observe-before-mutate.md` | `soon: true` |

Use today's date for any `date` field. Two things in those files are there for history,
not as patterns: `slug` keeps URLs that existed before the move to Astro, and
`maps-with-python.md` carries the `featured` panel, which is not yet a documented
pattern.

### Every field, by section

```yaml
---
title: Short title of the item            # required
slug: url-name                            # optional: write-up URL /writing/url-name.html

experiment:
  title: Card title                       # optional override
  date: 2026-10-21                        # cards are listed oldest first
  glyph: "<one emoji>"
  status: { label: in flight, kind: cont } # kind sets the pill colour:
                                          #   ship = lime, cont = teal, stop = amber, idea = grey
  pills: [extra, grey, pills]             # optional
  link: { href: "https://…", label: Repo } # optional: makes the card a link ("Repo ▸")
                                          # href may be left out when the entry has an app
  playable: true                          # optional: brighter hover border for games
  blurb: >-                               # markdown
    One short paragraph.

research:
  title: Decision title                   # optional override
  date: 2026-10-21                        # decisions are listed oldest first
  verdict: { label: Ship, kind: transfer } # kind sets the pill colour:
                                          #   transfer = lime, continue = teal, defer = amber
  text: >-                                # markdown
    What was decided and why.

partnership:
  title: Partner — topic                  # optional override; partnerships are listed by title
  chip: "<emoji or symbol>"
  next: the next step, shown after "Next:"
  text: |-                                # markdown; leave a blank line between paragraphs
    First paragraph.

    Second paragraph.

writeup:
  title: Article title                    # optional override
  date: 2026-10-21                        # write-ups are listed newest first
  format: Build notes                     # optional: shown after the date
  summary: >-                             # markdown; used on cards
    One or two sentences.
  description: Plain text for search and link previews.   # optional; defaults to the summary
  lede: >-                                # optional, markdown: opening paragraph under the title
    The opening paragraph.
  byline:                                 # optional facts row
    - { label: Team, value: Anaconda Incubation }
  cta: { href: /condary/, label: Play Condary }  # optional nav button; default "Play something"
  soon: true                              # optional: listed as "Coming soon", no page, no date needed

app:
  source: ./apps/name.html                # the HTML file, relative to this .md file
  path: /name/                            # where it is published
---
Write-up body in markdown. Only entries with a `writeup` section use the body.
```

### Write-up bodies

Write the article in plain markdown: headings, paragraphs, lists, tables, blockquotes,
fenced code blocks with a language (` ```python `) for highlighting, and images.

Raw HTML is used for two blocks markdown cannot express. Leave a blank line after each
opening tag and before each closing tag, so the markdown inside is rendered:

```markdown
<div class="callout">
<div class="tag">Try it</div>

Text with **markdown** and [links](https://example.com).

</div>

<div class="sources">

## Sources & notes

1. First source.

</div>
```

A callout can hold several `<div class="tag">` labels, each followed by its text.

Put images in `content/img/` and reference them relative to the entry, for example
`![Alt text](./img/journal-card.png)`. Astro resizes them and converts them to webp.

## Apps

An app is a standalone HTML file that the site publishes unchanged at its own path. An
entry's `app` section says "take this HTML and publish it here":

```yaml
app:
  source: ./apps/quizaconda.html
  path: /quizaconda/
```

- Put app files in `content/apps/`. They are never processed: the published file is
  byte-for-byte the source.
- `/quizaconda/` is published as `dist/quizaconda/index.html`. Paths look like `/name/`
  and may not use the site's own paths (`/`, `/writing/`, `/404.html`, `/_astro/`).
- A card in the same entry links to the app when its `link` has no `href`:
  `link: { label: Play }`.
- An entry with only an `app` section is valid: the app is published and listed nowhere.
- Apps are single files today. An app that needs its own images or scripts would go in a
  subdirectory of `content/apps/` with relative references; the publishing route would
  need to copy that folder too.

The route that publishes apps is `src/pages/[...app].ts`.

## Ordering

Content files do not set their position. Each list sorts by a fixed rule in
`src/lib/entries.ts`:

| List | Order |
| --- | --- |
| Experiment cards | `experiment.date`, oldest first |
| Research decisions | `research.date`, oldest first |
| Partnerships | Title, alphabetical |
| Write-ups | `writeup.date`, newest first; `soon` pieces last |

Ties are broken by title. Write-up dates are shown as "October 6, 2026".

## Styling

There is one stylesheet, `src/styles/site.css`. Its header comment explains the layout:
tokens, shared base, then one section per page type (`.page-home`, `.page-writing`,
`.page-404`), scoped by a class on `<body>`.

- Use the colour tokens (`--lime`, `--green`, `--teal`, `--muted`, `--panel`, `--line`
  and the rest in `:root`), never raw colour values.
- Classes available to content are `callout`, `tag` (inside a callout) and `sources`.
  Content files do not add their own CSS.

## Checks

`npm run build` fails, naming the file and field, when:

- a field is missing, misspelled, or has a value outside its allowed list, such as an
  unknown `status.kind`
- a file has none of the five sections
- an experiment `link` has no `href` and the entry has no `app`
- an `app.source` file does not exist
- two entries publish an app at the same `path`, or a path belongs to the site

Run `npm run build` before opening a PR, and fix every error it reports.

## Deploy

A push to `main` runs `.github/workflows/deploy.yml`: Node from `.nvmrc`, `npm ci`, then
`wrangler deploy`, which runs the build and uploads `dist/` to the `anacondanext` Worker
on Cloudflare. Page URLs are stable: write-ups stay at `/writing/<name>.html`, apps at
their `path`.

## Known issues

- **A running `astro dev` misses changes to `src/content.config.ts`.** Restart it after
  editing the schema or loader; until then, sections can render empty.
- **`wrangler dev` fails on a fresh clone.** Recent npm versions ask before running
  install scripts. Run `npm approve-scripts workerd esbuild`, then try again.
- **Port 8787 is already in use.** Another `wrangler dev` is running. Stop it, or use
  `npx wrangler dev --port 8799`.
- **Editing an app's HTML does not reload the browser.** Refresh manually; the dev
  server reads the file on each request.
- **A build after deleting an asset produces no output.** Delete `.astro/` and build
  again.
