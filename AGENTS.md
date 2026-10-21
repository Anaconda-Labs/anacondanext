# Agent instructions

Read `README.md` first. It is the source of truth for how this site works; these rules
only add what agents tend to get wrong.

- Content changes go in `content/` only. Do not edit `src/` (pages, layouts, components,
  `site.css`) to make a content change.
- Start from the file the README's "start from this file" table names for your task.
  Copy its structure, not its content.
- Do not copy `featured` or `slug` unless the task needs them.
- Use today's date for any `date` field. Do not add fields to control ordering; ordering
  comes from dates.
- Use only the sections, fields, CSS classes and colour tokens documented in the README.
- Leave files in `content/apps/` alone unless the task is about that app.
- Run `npm run build` and fix every error it reports before finishing.
