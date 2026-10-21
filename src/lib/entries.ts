// Lists of entries for each part of the site, in display order.
// Ordering rules live here, not in content files.
import { getCollection, type CollectionEntry } from "astro:content";

export type Entry = CollectionEntry<"entries">;
type Data = Entry["data"];
type Section = "experiment" | "research" | "partnership" | "writeup" | "featured";

/** Every entry that has `section`, paired with that section (no longer optional). */
async function withSection<K extends Section>(section: K) {
  const entries = await getCollection("entries");
  return entries.flatMap((entry) => {
    const value = entry.data[section];
    return value ? [{ entry, [section]: value } as { entry: Entry } & Record<K, NonNullable<Data[K]>>] : [];
  });
}

const time = (date: Date | undefined) => date?.getTime() ?? 0;
const byTitle = (a: string, b: string) => a.localeCompare(b);

/** Experiment cards, oldest first. */
export async function experiments() {
  return (await withSection("experiment")).sort(
    (a, b) =>
      time(a.experiment.date) - time(b.experiment.date) || byTitle(a.entry.data.title, b.entry.data.title),
  );
}

/** Research decisions, oldest first. */
export async function research() {
  return (await withSection("research")).sort(
    (a, b) => time(a.research.date) - time(b.research.date) || byTitle(a.entry.data.title, b.entry.data.title),
  );
}

/** Partnerships, by title. */
export async function partnerships() {
  return (await withSection("partnership")).sort((a, b) =>
    byTitle(a.partnership.title ?? a.entry.data.title, b.partnership.title ?? b.entry.data.title),
  );
}

/** Write-ups, newest first; "coming soon" pieces last. */
export async function writeups() {
  return (await withSection("writeup")).sort(
    (a, b) =>
      Number(a.writeup.soon) - Number(b.writeup.soon) ||
      time(b.writeup.date) - time(a.writeup.date) ||
      byTitle(a.entry.data.title, b.entry.data.title),
  );
}

/** The featured panel, if an entry sets one. */
export async function featured() {
  return (await withSection("featured"))[0]?.featured;
}

/** "October 6, 2026". Dates are calendar days, so format in UTC. */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** URL of an entry's write-up page. */
export const writeupHref = (entry: Entry) => `/writing/${entry.id}.html`;
