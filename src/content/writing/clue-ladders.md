---
title: "Clue ladders: designing a daily puzzle about real packages"
order: 5
when: "September 2026"
kind: "Design notes"
summary: "Five clues per package, ordered as a single information gradient, with the modal solve landing at clue two or three. How we fact-check every rung against Distro-DB records, project history, and maintainer lore — and decide which famous stories <em>not</em> to use."
description: "Five clues per package, ordered as a single information gradient, with the modal solve landing at clue two or three. How Condary's clue ladders get fact-checked — and which famous stories don't make the cut."
lede: "<strong>Condary</strong> is a daily game about the packages that make up the Conda and Python ecosystems. Each puzzle is a ladder: five clues about one real package, from obscure origin story down to a mercy clue. The design constraint that shapes everything: <strong>the clues are about real packages, so the clues have to be fact-checked like real documentation.</strong>"
byline:
  - { label: "Game", value: "Condary — Season 0" }
  - { label: "Team", value: "Anaconda Incubation" }
  - { label: "Sources", value: "Distro-DB · project docs · maintainer history" }
cta: { href: "/condary/", label: "Play Condary" }
---
## The ladder

Five clues per package, ordered as a single information gradient — not category-themed, not five trivia facts in
a row. The top clue is a deep-cut flash of knowledge: package archaeology that should feel *impressive* to
know, not required. The bottom clue is a mercy: the line every tutorial starts with. The design goal is that the
modal solve lands at clue two or three — enough of a climb to be satisfying, enough of a descent to never be
humiliating.

An abridged example — `pandas`, Season 0:

<div class="callout">
<div class="tag">Clue 1 · 1000 points</div>

I began in 2008 as a skunkworks project at a quantitative hedge fund, so a researcher could reproduce econometric
work after moving a front-office stack onto Python.

<div class="tag">Clue 2 · 800</div>

When two labeled objects do arithmetic, I take the union of their indexes and fill the holes with missing values
rather than silently dropping labels.

<div class="tag">Clue 5 · 200 (the mercy)</div>

Most tutorials start with `import mystery as pd`. I aim to be the fundamental high-level building
block for practical data analysis in Python.

</div>

Notice what clue 2 does: it's the *alignment quirk* — a behavior you'd know from using the library even if
you've never read its history. A good ladder mixes three kinds of knowledge: origin story, behavioral signature,
and everyday API. Clue 3 in the full ladder is literally a code snippet. If you use the thing, you can climb
without ever knowing the lore.

## Fact-checking the fun

Every ladder is drafted against records from **Distro-DB** — package summaries, upstream URLs, install
names — and then verified against primary sources: official docs, project history pages, maintainer posts, PyPI
metadata, GitHub advisories, and the occasional piece of conference lore. Each clue's notes record what was
deliberately *left out* and why.

The pandas clue 1 again: the hedge-fund origin stays, but Wes McKinney's name, the firm, and the year are kept
out of the sentence — people who know that story should still get to feel clever at 1000 points. And one widely
repeated etymology, the "panel data" backronym, is **not used**, because it doesn't appear on the
project's current official about page. Famous-but-unverified loses to boring-but-true.

> The puzzles are fiction-adjacent, but the facts aren't. If a clue wouldn't survive being read by the package's
> maintainers, it doesn't ship.

## Season 0 and the single-file constraint

Season 0 is twenty packages, one per day, advancing at midnight UTC. Like its sibling Quizaconda, the entire game
ships as a **single self-contained HTML file** — no build step, no backend, no dependencies. The
season's clue ladders live in a reviewed editorial document alongside the game, so every puzzle's provenance is
inspectable.

<div class="callout">
<div class="tag">Play it</div>

**[Condary — Season 0](/condary/)** and **[Quizaconda](/quizaconda/)** are both
playable now. A new puzzle every day at 00:00 UTC. How deep can you climb before the mercy clue?

</div>

<div class="sources">

## Sources & notes

1. Condary Season 0 clue ladders — reviewed editorial document with per-clue difficulty notes and sources (Incubation, 2026).
2. Distro-DB project records: summaries, upstream PURLs, install names.
3. Per-package primary sources: pandas project docs and maintainer pages, plus the official sources cited on each ladder.

</div>
