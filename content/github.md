---
title: GitHub — Copilot Cloud Agents
slug: known-unsafe-vs-affirmatively-trusted
partnership:
  chip: "⬢"
  next: one focused prototype, one defined end-to-end Secure Python experience, named technical owners.
  text: |-
    GitHub's Advisory Database helps an agent avoid *known* bad packages. Anaconda's controlled intake, independent
    builds, and malware scanning establish that an unknown package is *trusted*. Two different layers of the same
    defense.

    Three paths surfaced from the conversation: an Anaconda-maintained base image for GitHub's emerging cloud-agent
    microVM runtime, a `setup-anaconda` Action for approved channels on Actions runners, and Anaconda MCP + skills in
    GitHub's plugin marketplace.
writeup:
  title: Known-unsafe vs. affirmatively trusted
  date: 2026-09-05
  format: Field notes
  summary: >-
    GitHub's Advisory Database teaches an agent to avoid packages already known to be dangerous. It cannot tell an
    agent that an unknown package is trustworthy. Notes on where controlled package admission fits beside
    vulnerability intelligence, and the three integration paths that emerged.
  description: "An agent can check dependencies against a vulnerability database. That answers a different question than whether an unknown package is trustworthy. Notes from a conversation with GitHub about Copilot Cloud Agents."
  lede: >-
    Notes from a recent conversation with the GitHub team about **Copilot Cloud Agents** and what it would take for
    the Python those agents install to be trusted by construction. The sharpest idea from the call: **a vulnerability
    database answers "is this package known to be bad?" — not "is this package good?"** Those are different security
    guarantees, and agents need both.
  byline:
    - { label: "Context", value: "Anaconda × GitHub exploratory call" }
    - { label: "Team", value: "Anaconda Incubation" }
    - { label: "Status", value: "Exploratory — no integration committed" }
---
## Two questions, not one

GitHub's Advisory Database lets an agent check planned dependencies against everything publicly known to be
vulnerable or malicious. That's a meaningful guardrail, and it's exactly the right tool for the packages the
world has already had to learn about the hard way.

But it is, structurally, a *blocklist*. It cannot answer the prior question: is a package that nobody has
ever flagged — never examined, never named in an advisory — trustworthy to install? Establishing that requires a
different kind of infrastructure:

- **Controlled package intake** — packages enter through a review process, not a self-service upload
- **Verified source materials** — builds start from inspected sources, not from arbitrary wheels
- **Independent builds** — artifacts are rebuilt rather than mirrored
- **Malware scanning** — every release is scanned before publication
- **Curated channels & enterprise package policy** — organizations control what their agents can resolve

An admission-control layer like this doesn't replace vulnerability intelligence. It sits one step earlier:
vulnerability intelligence catches what the world knows, admission control constrains what can arrive in the
first place.

## What the ecosystem's bad days taught us

Recent Python supply-chain incidents illustrate the distinction. In one cluster of incidents, malicious releases
of a popular computer-vision library appeared on public registries and were pulled by downstream users before
anyone could react. In two other cases, packages with injected malicious code propagated rapidly through public
mirrors.

None of those malicious releases entered Anaconda `main`. Not because we predicted the attacks, but
because `main` is **not a transparent mirror**: intake delay, source verification, an
independent build pipeline, malware scanning, and controlled publishing break the rapid-publish attack path that
these incidents relied on.

> The protection only holds when the environment is actually constrained to approved channels. It can be bypassed
> by a setup script, by an unapproved channel, by a direct `pip` call — or by a silent fallback when a
> package isn't available.

That last one deserves emphasis. Agents are optimistic systems; when instructed path fails, they try another.
A "trusted" environment that quietly falls back to public registries under failure is not trusted — it's trusted
*when convenient*.

## Where this could go for cloud agents

GitHub's Cloud Agents currently run on Actions infrastructure and are moving toward dedicated microVM compute —
largely for startup speed and pause/resume behavior, which CI infrastructure was never designed for. The current
"kitchen sink" image strategy (every runtime, every toolchain, in one image) may give way to a marketplace of
specialized base images. Three paths surfaced from the conversation:

| Path | Time horizon | Idea |
| --- | --- | --- |
| Anaconda base image for the microVM runtime | Medium term | A trusted Python foundation with curated channels, reproducible environment construction, and security metadata, maintained for the agent runtime |
| A `setup-anaconda` Action | Near term | Configure an Actions runner to resolve through approved channels, with policy that prevents silent fallback to public registries |
| MCP and skills in the plugin marketplace | Near term | Distribute Anaconda MCP plus a Conda golden-path skill so agents handle environments consistently |

A technically honest division of labor for the setup path: the Action installs and configures Conda with approved
channels; enterprise policy decides which channels and versions are permitted; network policy *enforces*
the decision rather than translating protocols (a PyPI request cannot be transparently redirected into a Conda
channel — different APIs, artifacts, and resolution semantics); Anaconda MCP guides environment operations; and
vulnerability intelligence from both sides runs continuously.

## What we're NOT saying yet

This was an exploratory call. No integration has been committed, no commercial structure agreed, no delivery date
set, no technical owners named on either side. Several hard design questions are open — who builds, signs, patches,
and supports such an image; how private-channel credentials are injected without entering model context; what
happens when an approved channel lacks a requested version; and at what level (enterprise, org, repository, session)
policy can be expressed.

We're publishing this because the *framing* stands on its own regardless of what either company ships:
**avoiding known-unsafe packages and establishing affirmative trust are different guarantees**, and
agentic coding needs both. When an agent installs your dependencies at machine speed, "nobody has complained yet"
is not a security posture.

<div class="callout">
<div class="tag">What would make this real</div>

**One concrete experience:** an enterprise administrator enables Secure Python for cloud agents. Agent sessions
start from a maintained foundation, resolve dependencies through approved channels, use MCP and skills for
environment operations, and cannot silently fall back to unapproved registries.

**One small prototype** and named technical owners. We'd rather prove the smallest loop end-to-end than
schedule a bigger conversation about a bigger roadmap.

</div>

<div class="sources">

## Sources & notes

1. Notes from the Anaconda × GitHub exploratory call, August 27, 2026. Participants from Microsoft, GitHub, and Anaconda. Exploratory only.
2. Incident observations reference the malicious releases of a popular vision library (specific versions withheld here), a compromised LLM-tooling release, and a telephony SDK incident — in each case the malicious versions were not admitted to Anaconda `main`.
3. These examples demonstrate that controlled intake broke specific rapid-publish attack paths. They do not prove no malicious package could ever pass such controls.

</div>
