---
title: "One world, many maps, zero setup"
order: 4
when: "September 2026"
kind: "Build notes"
summary: "Real geodesy, no install: NumPy running in Pyodide, a Three.js globe, Natural Earth geometry, and distortion circles after Tissot's 1858 idea. How the projection math, the data pipeline, and the \"no Python setup needed\" promise came together — sources cited all the way down."
description: "Real geodesy in the browser: NumPy running in Pyodide, a Three.js globe, Natural Earth geometry, and distortion circles after Tissot's 1858 idea. How Maps with Python came together."
lede: "<a href=\"https://mapswithpython.com\" target=\"_blank\" rel=\"noopener\">Maps with Python</a> is an interactive field guide to map projections. Grab a globe, flatten it, and watch every projection bend the truth differently — with the geodesy computed live by <strong>NumPy running in your browser</strong>. This is how it came together, and why \"no Python setup needed\" was the whole point."
byline:
  - { label: "Site", value: "mapswithpython.com" }
  - { label: "Team", value: "Anaconda Incubation" }
  - { label: "Stack", value: "Pyodide · NumPy · Three.js · KaTeX" }
---
<h2>A map is an optimization problem</h2>
<p>Every flat map of our 3D world forces a choice: every projection preserves something and changes something else.
  Mercator was designed in 1569 for navigation — a sailor needs a steady bearing, so directions are true and areas
  near the poles balloon. A reader comparing countries needs fair areas, which is the job of equal-area projections
  like Gall–Peters and Equal Earth. AuthaGraph abandons the flat rectangle entirely, folding the world onto a
  tetrahedron.</p>
<p>You can <em>state</em> that tradeoff. You can also let someone <em>feel</em> it: drag a real globe, flatten it,
  and watch the distortion move to wherever you're not looking. That's the site.</p>

<h2>Follow the circles</h2>
<p>The distortion overlay descends from <strong>Tissot's indicatrix</strong> — the idea of drawing the same small
  circle on Earth in many places and seeing what the projection does to it. A projection can enlarge the circle,
  shrink it, or stretch it into an ellipse. These marks make the tradeoffs visible in a way no table of projection
  parameters can.</p>
<p>One subtlety worth confessing in the UI itself: on the interactive globe, circles near the rim look flattered
  purely from perspective — you're seeing them at an angle. That's not flat-map distortion. The site separates the
  two so the indicatrix teaches the right lesson.</p>

<h2>The stack: real Python, in the page</h2>
<ul>
  <li><strong>Pyodide + NumPy</strong> — the projection mathematics runs on genuine NumPy inside the browser tab.
    No server, no install, no notebook to start. The same arrays and formulas you'd write in a script execute
    locally at interactive rates.</li>
  <li><strong>Three.js</strong> — the grabbable globe, texture-mapped with NASA Blue Marble, with Natural Earth
    110m and 50m vector data for coastlines, lakes, and place names.</li>
  <li><strong>KaTeX</strong> — the mathematics is typeset properly, because projection formulas deserve better than
    ASCII approximations.</li>
  <li><strong>Cited all the way down</strong> — Equal Earth follows Šavrič, Patterson &amp; Jenny (2018/2019);
    the AuthaGraph formulation follows Narukawa's 2022 paper, which approximates the original hand-built tetrahedron
    with four cones at under 4% radial deviation; distortion metrics draw on the USGS projection manual and
    Goldberg &amp; Gott's flexion and skewness work.</li>
</ul>

<h2>Why zero setup matters</h2>
<p>A field guide that requires an environment is a field guide most people never open. Running the math in-browser
  means the site works on a phone, works offline once loaded, and never asks anyone to trust a server with their
  session. It also makes a quiet argument we care about: <strong>Python is a good language for explaining
  things</strong>, not just for building products. A few lines of NumPy can change how you see the world.</p>

<h2>Why this matters now</h2>
<p>Projection choice isn't a settled historical curiosity. In September 2026 the UN General Assembly adopted a
  resolution championed by Togo encouraging equal-area projections for general-reference world maps, and the African
  Union followed with a statement welcoming it. Mercator's 450-year run as the default world map is finally being
  examined by the people it has always misrepresented. A site about what projections optimize for turned out to be
  timely in a way we didn't plan.</p>

<div class="callout">
  <span class="tag">Try it</span>
  <p><b><a href="https://mapswithpython.com" target="_blank" rel="noopener">mapswithpython.com</a></b> — start with
  the globe, flatten it, turn on the distortion circles, then pit Mercator against Gall–Peters, Equal Earth, and
  AuthaGraph. Sources and notes are one tap away in the footer.</p>
</div>

<div class="sources">
  <h2>Sources &amp; notes</h2>
  <ol>
    <li>Šavrič, B., Patterson, T., &amp; Jenny, B. (2019). "The Equal Earth map projection." IJGIS 33(3), 454–465.</li>
    <li>Snyder, J. P. (1987). Map Projections: A Working Manual. USGS Professional Paper 1395 — Tissot's indicatrix.</li>
    <li>Narukawa, H. (2022). "Formulation of AuthaGraph Map Projection and an Evaluation of its Distortion." Map 60(1), 1–16.</li>
    <li>Kerkovits, K. (2021). "Image-Based Angular Distortion Metric for Comparing World Map Projections." ISPRS IJGI 11(1):1.</li>
    <li>Goldberg, D. M., &amp; Gott, J. R. (2007). "Flexion and skewness in map projections of the Earth." Cartographica 42(4).</li>
    <li>Natural Earth vector data (public domain); NASA Blue Marble imagery; PROJ reference implementations.</li>
    <li>African Union Commission statement on the UN General Assembly equal-area map resolution, September 4, 2026.</li>
  </ol>
</div>
