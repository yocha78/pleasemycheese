import React, { useState, useMemo, useRef, useCallback } from "react";
import { FAMILIES } from "./data/families.js";
import { suggest, resolve, fromFamily, random, COUNT } from "./lib/search.js";

const RULES = [
  ["White before red", "Tannin collides with the fat and protein in cheese and turns metallic. Whites bring acidity instead."],
  ["Acid cuts fat", "The richer the paste, the brighter the wine needs to be. Bubbles do the same job."],
  ["Grows together, goes together", "Cheese and wine from one region usually already know each other."],
  ["Sweet against salt", "Blues are salty and sharp. Sugar is what balances them, not tannin."],
];

/* The glass. The bowl fills with the wine's actual colour. */
const BOWL = "M 16 12 L 84 12 L 84 40 C 84 66 70 80 50 80 C 30 80 16 66 16 40 Z";

function findUrl(wine) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${wine} wine near me`)}`;
}

function Glass({ color }) {
  const uid = useMemo(() => `g${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg className="glass" viewBox="0 0 100 150" aria-hidden="true">
      <defs>
        <clipPath id={uid}>
          <path d={BOWL} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid})`}>
        <g className="pour">
          <rect x="10" y="44" width="80" height="40" fill={color} />
          <ellipse cx="50" cy="44" rx="36" ry="3.4" fill={color} opacity="0.55" />
        </g>
      </g>
      <path d={BOWL} fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M 50 80 L 50 128" stroke="currentColor" strokeWidth="1.6" />
      <path d="M 26 130 Q 50 124 74 130" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [openAlso, setOpenAlso] = useState(() => new Set());
  const inputRef = useRef(null);

  const suggestions = useMemo(() => (result ? [] : suggest(query)), [query, result]);

  const show = useCallback((next) => {
    if (!next) return;
    setResult(next);
    setQuery(next.entry.name);
    setOpenAlso(new Set());
    if (inputRef.current) inputRef.current.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function submit() {
    if (!query.trim()) return;
    show(resolve(query));
  }

  function reset() {
    setResult(null);
    setQuery("");
    setOpenAlso(new Set());
    if (inputRef.current) inputRef.current.focus();
  }

  function toggleAlso(i) {
    setOpenAlso((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const entry = result ? result.entry : null;

  return (
    <div className="app">
      <header className="head">
        <h1 className="mark">
          Please<span>My</span>Cheese
        </h1>
        <p className="tagline">Name the cheese. Get the bottle.</p>
      </header>

      <div className="field">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setResult(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="Comté, Roquefort, Taleggio…"
          aria-label="Cheese name"
          autoComplete="off"
          autoCapitalize="words"
          spellCheck="false"
        />
        <button onClick={submit} disabled={!query.trim()}>
          Pour
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="suggest">
          {suggestions.map((c) => (
            <li key={c.name}>
              <button onClick={() => show({ entry: c, kind: "cheese" })}>
                <span>{c.name}</span>
                <em>{c.family}</em>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!result && (
        <div className="intro">
          <p className="lede">
            Most cheese-and-wine advice reaches for a big red. Sommeliers mostly don't — tannin and cheese fat turn
            metallic. Four rules do the work instead.
          </p>
          <dl className="rules">
            {RULES.map(([name, text]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
          <button className="link" onClick={() => show({ entry: random(), kind: "cheese" })}>
            Show me one
          </button>
        </div>
      )}

      {entry && (
        <article className="result">
          <p className="cheese">
            {entry.name}
            {(entry.family || entry.origin) && (
              <span>{[entry.family, entry.milk, entry.origin].filter(Boolean).join(" · ")}</span>
            )}
          </p>

          {entry.tasting && <p className="tasting">{entry.tasting}</p>}

          <div className="pairing">
            <Glass color={entry.color} />
            <div>
              <p className="pour-label">Pour this</p>
              <h2 className="wine">{entry.wine}</h2>
              <p className="style">{entry.style}</p>
              <a className="find" href={findUrl(entry.wine)} target="_blank" rel="noopener noreferrer">
                Find it near you →
              </a>
            </div>
          </div>

          <p className="rule">{entry.rule}</p>
          <p className="why">{entry.why}</p>

          <section className="block">
            <h3>Also good</h3>
            {entry.also.map(([wine, note], i) => {
              const open = openAlso.has(i);
              return (
                <div className="also-item" key={i}>
                  <div className="also-row">
                    <strong>{wine}</strong>
                    <button className="toggle" onClick={() => toggleAlso(i)} aria-expanded={open}>
                      More about this wine
                      <span className="chevron" aria-hidden="true">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                  {open && (
                    <div className="also-detail">
                      <p>{note}</p>
                      <a className="find find-small" href={findUrl(wine)} target="_blank" rel="noopener noreferrer">
                        Find it near you →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <section className="block warn">
            <h3>Steer clear</h3>
            <p>
              <strong>{entry.avoid[0]}</strong> — {entry.avoid[1]}
            </p>
          </section>

          {result.kind === "universal" && (
            <section className="block">
              <h3>Not in the book — what kind is it?</h3>
              <div className="chips">
                {FAMILIES.map((f) => (
                  <button key={f.id} onClick={() => show(fromFamily(f.id))}>
                    {f.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          <button className="link" onClick={reset}>
            Another cheese
          </button>
        </article>
      )}

      <footer className="foot">
        <p>{COUNT} cheeses in the book. Pairings follow Decanter, Wine Enthusiast and French fromagerie practice.</p>
      </footer>
    </div>
  );
}
