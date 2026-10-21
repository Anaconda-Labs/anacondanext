---
title: Maps with Python
slug: building-maps-with-python
featured:
  eyebrow: Now showing
  heading: One world. Many maps. Zero setup.
  intro: >-
    An interactive Python field guide to map projections: **Maps with Python**.
    Grab a globe, flatten it, and watch every projection bend the truth differently — all computed in your browser.
  tag: Interactive field guide · live
  panelTitle: Maps with Python — what changes when we flatten the world?
  text: |-
    A sailor needs a steady bearing. A reader comparing countries needs fair areas. Every flat map is an optimization
    problem, so we built the tradeoffs you can *feel*: drag a real globe, then watch Tissot's distortion circles
    stretch across Mercator, Gall–Peters, Equal Earth, and AuthaGraph.

    Everything runs locally in your browser — the geodesy is computed by **NumPy in Pyodide**, the globe is rendered
    with Three.js, and every projection's math is cited down to the paper.
  stats:
    - { value: "4", label: "projections, side by side" }
    - { value: "0", label: "Python installs needed — Pyodide" }
    - { value: "10", label: "cited sources & notes" }
    - { value: "1", label: "planet, gently distorted" }
  actions:
    - { href: "https://mapswithpython.com", label: "Open mapswithpython.com ▸", style: primary, external: true }
    - { href: "#writing", label: "How we built it", style: ghost }
writeup:
  title: One world, many maps, zero setup
  date: 2026-09-03
  format: Build notes
  summary: >-
    Real geodesy, no install: NumPy running in Pyodide, a Three.js globe, Natural Earth geometry, and distortion
    circles after Tissot's 1858 idea. How the projection math, the data pipeline, and the "no Python setup needed"
    promise came together — sources cited all the way down.
  description: "Real geodesy in the browser: NumPy running in Pyodide, a Three.js globe, Natural Earth geometry, and distortion circles after Tissot's 1858 idea. How Maps with Python came together."
  lede: >-
    [Maps with Python](https://mapswithpython.com) is an interactive field guide to map projections. Grab a globe,
    flatten it, and watch every projection bend the truth differently — with the geodesy computed live by **NumPy
    running in your browser**. This is how it came together, and why "no Python setup needed" was the whole point.
  byline:
    - { label: "Site", value: "mapswithpython.com" }
    - { label: "Team", value: "Anaconda Incubation" }
    - { label: "Stack", value: "Pyodide · NumPy · Three.js · KaTeX" }
---
## A map is an optimization problem

Every flat map of our 3D world forces a choice: every projection preserves something and changes something else.
Mercator was designed in 1569 for navigation — a sailor needs a steady bearing, so directions are true and areas
near the poles balloon. A reader comparing countries needs fair areas, which is the job of equal-area projections
like Gall–Peters and Equal Earth. AuthaGraph abandons the flat rectangle entirely, folding the world onto a
tetrahedron.

You can *state* that tradeoff. You can also let someone *feel* it: drag a real globe, flatten it,
and watch the distortion move to wherever you're not looking. That's the site.

## Follow the circles

The distortion overlay descends from **Tissot's indicatrix** — the idea of drawing the same small
circle on Earth in many places and seeing what the projection does to it. A projection can enlarge the circle,
shrink it, or stretch it into an ellipse. These marks make the tradeoffs visible in a way no table of projection
parameters can.

One subtlety worth confessing in the UI itself: on the interactive globe, circles near the rim look flattered
purely from perspective — you're seeing them at an angle. That's not flat-map distortion. The site separates the
two so the indicatrix teaches the right lesson.

## The stack: real Python, in the page

- **Pyodide + NumPy** — the projection mathematics runs on genuine NumPy inside the browser tab.
  No server, no install, no notebook to start. The same arrays and formulas you'd write in a script execute
  locally at interactive rates.
- **Three.js** — the grabbable globe, texture-mapped with NASA Blue Marble, with Natural Earth
  110m and 50m vector data for coastlines, lakes, and place names.
- **KaTeX** — the mathematics is typeset properly, because projection formulas deserve better than
  ASCII approximations.
- **Cited all the way down** — Equal Earth follows Šavrič, Patterson & Jenny (2018/2019);
  the AuthaGraph formulation follows Narukawa's 2022 paper, which approximates the original hand-built tetrahedron
  with four cones at under 4% radial deviation; distortion metrics draw on the USGS projection manual and
  Goldberg & Gott's flexion and skewness work.

## Why zero setup matters

A field guide that requires an environment is a field guide most people never open. Running the math in-browser
means the site works on a phone, works offline once loaded, and never asks anyone to trust a server with their
session. It also makes a quiet argument we care about: **Python is a good language for explaining
things**, not just for building products. A few lines of NumPy can change how you see the world.

## Why this matters now

Projection choice isn't a settled historical curiosity. In September 2026 the UN General Assembly adopted a
resolution championed by Togo encouraging equal-area projections for general-reference world maps, and the African
Union followed with a statement welcoming it. Mercator's 450-year run as the default world map is finally being
examined by the people it has always misrepresented. A site about what projections optimize for turned out to be
timely in a way we didn't plan.

<div class="callout">
<div class="tag">Try it</div>

**[mapswithpython.com](https://mapswithpython.com)** — start with
the globe, flatten it, turn on the distortion circles, then pit Mercator against Gall–Peters, Equal Earth, and
AuthaGraph. Sources and notes are one tap away in the footer.

</div>

<div class="sources">

## Sources & notes

1. Šavrič, B., Patterson, T., & Jenny, B. (2019). "The Equal Earth map projection." IJGIS 33(3), 454–465.
2. Snyder, J. P. (1987). Map Projections: A Working Manual. USGS Professional Paper 1395 — Tissot's indicatrix.
3. Narukawa, H. (2022). "Formulation of AuthaGraph Map Projection and an Evaluation of its Distortion." Map 60(1), 1–16.
4. Kerkovits, K. (2021). "Image-Based Angular Distortion Metric for Comparing World Map Projections." ISPRS IJGI 11(1):1.
5. Goldberg, D. M., & Gott, J. R. (2007). "Flexion and skewness in map projections of the Earth." Cartographica 42(4).
6. Natural Earth vector data (public domain); NASA Blue Marble imagery; PROJ reference implementations.
7. African Union Commission statement on the UN General Assembly equal-area map resolution, September 4, 2026.

</div>
