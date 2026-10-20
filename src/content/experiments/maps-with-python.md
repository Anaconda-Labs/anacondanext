---
title: Maps with Python
order: 0
glyph: "🗺️"
status: { label: live, kind: ship }
link: { href: "https://mapswithpython.com", label: Open }
featured:
  eyebrow: Now showing
  heading: One world. Many maps. Zero setup.
  intro: >-
    An interactive Python field guide to map projections: <strong>Maps with Python</strong>.
    Grab a globe, flatten it, and watch every projection bend the truth differently — all computed in your browser.
  tag: Interactive field guide · live
  panelTitle: Maps with Python — what changes when we flatten the world?
  stats:
    - { value: "4", label: "projections, side by side" }
    - { value: "0", label: "Python installs needed — Pyodide" }
    - { value: "10", label: "cited sources & notes" }
    - { value: "1", label: "planet, gently distorted" }
  actions:
    - { href: "https://mapswithpython.com", label: "Open mapswithpython.com ▸", style: primary, external: true }
    - { href: "#writing", label: "How we built it", style: ghost }
---
A sailor needs a steady bearing. A reader comparing countries needs fair areas. Every flat map is an optimization
problem, so we built the tradeoffs you can *feel*: drag a real globe, then watch Tissot's distortion circles
stretch across Mercator, Gall–Peters, Equal Earth, and AuthaGraph.

Everything runs locally in your browser — the geodesy is computed by **NumPy in Pyodide**, the globe is rendered
with Three.js, and every projection's math is cited down to the paper.
