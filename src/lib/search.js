import { CHEESES } from "../data/cheeses.js";
import { FAMILIES, UNIVERSAL } from "../data/families.js";

/* Strips accents and punctuation so "comte" finds "Comté". */
export function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const INDEX = CHEESES.map((c) => ({
  cheese: c,
  terms: [norm(c.name), ...c.aka.map(norm)],
}));

/** Live suggestions while typing. */
export function suggest(query, limit = 7) {
  const q = norm(query);
  if (!q) return [];

  const starts = [];
  const contains = [];

  for (const { cheese, terms } of INDEX) {
    if (terms.some((t) => t.startsWith(q))) starts.push(cheese);
    else if (terms.some((t) => t.includes(q))) contains.push(cheese);
  }

  return [...starts, ...contains].slice(0, limit);
}

/**
 * Resolve whatever was typed into something to show.
 * Returns { entry, kind } where kind is "cheese", "family" or "universal".
 */
export function resolve(query) {
  const q = norm(query);
  if (!q) return null;

  // 1. Exact name or alias.
  const exact = INDEX.find(({ terms }) => terms.includes(q));
  if (exact) return { entry: exact.cheese, kind: "cheese" };

  // 2. Partial name — take the best suggestion.
  const near = suggest(query, 1);
  if (near.length) return { entry: near[0], kind: "cheese" };

  // 3. Family keywords, longest keyword first so "blue cheese" beats "cheese".
  let best = null;
  for (const fam of FAMILIES) {
    for (const kw of fam.keywords) {
      const k = norm(kw);
      if (q.includes(k) && (!best || k.length > best.len)) {
        best = { fam, len: k.length };
      }
    }
  }
  if (best) return { entry: familyEntry(best.fam, query), kind: "family" };

  // 4. Nothing recognised.
  return { entry: UNIVERSAL, kind: "universal" };
}

function familyEntry(fam, query) {
  const typed = String(query).trim();
  return {
    name: typed.charAt(0).toUpperCase() + typed.slice(1),
    family: fam.label,
    origin: "",
    milk: "",
    aka: [],
    wine: fam.wine,
    style: fam.style,
    color: fam.color,
    rule: fam.rule,
    why: fam.why,
    also: fam.also,
    avoid: fam.avoid,
  };
}

/** Turn a family card into an entry, for the "what kind is it?" buttons. */
export function fromFamily(id) {
  const fam = FAMILIES.find((f) => f.id === id);
  if (!fam) return null;
  return {
    entry: {
      name: fam.label,
      family: fam.hint,
      origin: "",
      milk: "",
      aka: [],
      wine: fam.wine,
      style: fam.style,
      color: fam.color,
      rule: fam.rule,
      why: fam.why,
      also: fam.also,
      avoid: fam.avoid,
    },
    kind: "family",
  };
}

export function random() {
  return CHEESES[Math.floor(Math.random() * CHEESES.length)];
}

export const COUNT = CHEESES.length;
