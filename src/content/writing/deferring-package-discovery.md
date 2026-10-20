---
title: "Deferring package discovery: what 37,801 packages taught us"
order: 2
when: "September 10, 2026"
kind: "Research"
summary: "Baseline retrieval found the expected conda package in the top 10 for 62% of task queries. LLM enrichment moved the number exactly nowhere. The full evaluation story — and why 83% with popularity reranking was a number we refused to ship — including the biases we caught in our own expected-answer lists."
description: "Can semantic search reliably help an agent discover a conda package from a task description? We evaluated retrieval, enrichment, and reranking across 42 synthetic queries and 37,801 packages — and decided to defer."
lede: "An agent that knows the task but not the package needs a discovery tool it can trust. We built one, measured it honestly, and decided <strong>not to ship it</strong>. This is the full story — including the number that looked great and the biases hiding behind it."
byline:
  - { label: "Owner", value: "Albert DeFusco" }
  - { label: "Team", value: "Anaconda Incubation" }
  - { label: "Status", value: "Completed research · stop/defer decision" }
---
## The question

Can a semantic search tool return useful conda packages when an agent knows the task but not the package name?
An agent asked to "analyze this portfolio's risk with a Monte Carlo simulation" doesn't need to already know that
a suitable library exists — it needs a tool that finds candidates it can defend. Retrieval is the difference between
an agent that hallucinates a package name and an agent that grounds its choices in the real ecosystem.

## The action

We embedded the entire conda ecosystem — **37,801 packages** — and evaluated four approaches against
**42 synthetic queries** spanning task descriptions, intents, keywords, and comparisons:

- **Baseline semantic retrieval** — embed packages, embed the query, rank by similarity
- **LLM enrichment** — have a model expand and rewrite queries before retrieval
- **Lexical reranking** — intersect semantic ranking with keyword signals
- **Popularity reranking** — boost packages with strong download signals

## The evidence

| Approach | Top-5 hit rate | Top-10 hit rate | Catch |
| --- | --- | --- | --- |
| Baseline (any-preferred) | **40%** | **62%** | Keyword queries reached 80%; task descriptions only 33% |
| + LLM enrichment | — | **62%** | No aggregate improvement over baseline |
| + Popularity reranking | — | **83%** | Favors already-popular packages; amplifies download and expected-answer bias |

Three findings mattered more than the table:

- **Task descriptions are the hard case.** The exact scenario that motivates the tool — an agent
  describing a task in natural language — is where baseline retrieval performs worst (33% at top 10). Keyword
  queries flatter the system because they leak vocabulary from the package metadata itself.
- **Enrichment was a wash.** LLM-rewritten queries did not improve aggregate top-10 retrieval. It
  changed *which* queries improved and which regressed, roughly cancelling out.
- **The 83% was seductive and suspect.** Popularity reranking looked like a 21-point win, but it
  systematically favors packages that were already popular — and our expected-answer lists were themselves biased
  toward well-known packages. Part of that "improvement" is the metric agreeing with itself.

> The evaluation proves package existence, not suitability. A valid alternative that simply wasn't on our expected
> list counts as a failure — and a popular wrong answer counts as a success.

## The decision

We kept `package_info` — known-package lookup, where retrieval quality is not the risk — and deferred
`find_package` discovery rather than shipping weak retrieval. A tool that hands an agent the wrong package
two times out of five, with confidence, is worse than no tool at all: the agent will proceed as if it were right.

<div class="callout">
<div class="tag">Next evidence — what would change the decision</div>

**Real queries.** Replace synthetic task descriptions with actual agent queries captured in the wild.

**Independent relevance judgments.** Multi-answer, independently reviewed lists of acceptable packages per query, so valid alternatives stop counting as failures.

**Fixed context budgets.** Compare methods under the same number of tokens the agent can afford to spend on results.

**Downstream task success.** Connect retrieval rank to what actually matters: task completion, tool calls, latency, and tokens.

</div>

## Why we're publishing a deferral

Most project write-ups end with a launch. Ours sometimes end with a decision not to build — and that's the point.
"Ship package lookup, defer discovery until the evidence improves" is a *good* outcome: it prevents weak
retrieval from becoming someone's dependency, and it names precisely the four things that would make revisiting
worthwhile. If you're building package discovery for agents and you have real queries or relevance judgments,
we'd genuinely like to compare notes.

<div class="sources">

## Sources & notes

1. Evaluation over 37,801 conda package embeddings; 42 synthetic queries across task, intent, keyword, and comparison types (Incubation, September 2026).
2. Package semantic search code and data — internal evaluation repository.
3. Hit rates measure whether a predefined expected package appears in the top-k results; all caveats in this post apply to that metric.

</div>
