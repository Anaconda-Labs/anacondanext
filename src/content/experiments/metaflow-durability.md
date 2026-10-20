---
title: Durable agents with Metaflow
order: 9
glyph: "♻️"
status: { label: open source, kind: cont }
pills: [Pydantic AI, Metaflow]
link: { href: "https://github.com/anaconda-incubation/metaflow-durability", label: Repo }
---
Pydantic AI agents that survive crashes, retries, and restarts. One capability journals every model and tool call
into the Metaflow step, so `@retry` replays what finished and runs the rest live. No workers, server or
workflow code: Metaflow's tasks, artifacts and retries are the engine.
