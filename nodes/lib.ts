// Shared helpers for christiangeorgelucas/country-tools.
//
// Data sources (both MIT, both offline/bundled — see README for the license
// audit):
//   - i18n-iso-countries — ISO 3166-1 alpha-2/alpha-3/numeric codes and
//     localized names (michaelwittig/node-i18n-iso-countries).
//   - countries-list — capital, continent, calling code, ISO 4217 currency
//     code(s) per country (annexare/Countries), documented as compiled from
//     ISO standards + Unicode CLDR + other public (non-share-alike) sources.
//
// ccTLD data is NOT sourced from any third-party package (no clean permissive
// ccTLD dataset was found); it is our own small table of IANA root-zone
// delegation facts (https://www.iana.org/domains/root/db) — bare factual
// code->TLD assignments, not creative expression.

import * as isoCountries from 'i18n-iso-countries';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const enLocale = require('i18n-iso-countries/langs/en.json');
import { countries as clCountries, continents as clContinents } from 'countries-list';

isoCountries.registerLocale(enLocale);
const registeredLocales = new Set<string>(['en']);

/** Registers (and caches) an i18n-iso-countries locale on first use, falling
 * back to "en" for a language with no bundled locale file. Returns the
 * language actually usable after this call. */
export function ensureLocale(rawLang: string | undefined | null): string {
  const lang = (rawLang || 'en').trim().toLowerCase();
  if (!lang) return 'en';
  if (registeredLocales.has(lang)) return lang;
  // Guard against path-traversal-shaped input reaching require(): only a
  // plain lowercase language subtag (letters/digits/hyphen, short) may pass.
  if (!/^[a-z0-9-]{1,8}$/.test(lang)) return 'en';
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require(`i18n-iso-countries/langs/${lang}.json`);
    isoCountries.registerLocale(data);
    registeredLocales.add(lang);
    return lang;
  } catch {
    return 'en';
  }
}

const CODE_SHAPE_RE = /^[A-Za-z0-9]{1,8}$/;

/** Bounds and trims a raw code field. Returns null for anything malformed:
 * empty, too long, or containing characters no ISO 3166-1 code form ever
 * has. Never throws. */
export function normalizeCodeInput(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!CODE_SHAPE_RE.test(trimmed)) return null;
  return trimmed;
}

export type CodeFormat = 'alpha2' | 'alpha3' | 'numeric' | 'unknown';

/** Detects which ISO 3166-1 code form a syntactically-plausible (already
 * normalized) code is shaped like, WITHOUT validating it is a real country. */
export function detectFormat(code: string): CodeFormat {
  if (/^[0-9]+$/.test(code)) return 'numeric';
  if (/^[A-Za-z]{2}$/.test(code)) return 'alpha2';
  if (/^[A-Za-z]{3}$/.test(code)) return 'alpha3';
  return 'unknown';
}

/** Resolves any well-formed ISO 3166-1 code form to its alpha-2 code, but
 * ONLY if it is a real, assigned country — i18n-iso-countries' own
 * `toAlpha2` is permissive (it blindly upper-cases an unrecognized 2-letter
 * string instead of rejecting it), so every call site must gate through
 * `isValid` rather than trust a non-empty return. Returns null for anything
 * malformed or unknown. */
export function resolveAlpha2(raw: unknown): string | null {
  const code = normalizeCodeInput(raw);
  if (code === null) return null;
  const format = detectFormat(code);
  let alpha2: string | undefined;
  if (format === 'numeric') {
    alpha2 = isoCountries.numericToAlpha2(code);
  } else if (format === 'alpha2') {
    alpha2 = code.toUpperCase();
  } else if (format === 'alpha3') {
    alpha2 = isoCountries.alpha3ToAlpha2(code.toUpperCase());
  } else {
    return null;
  }
  if (!alpha2 || !isoCountries.isValid(alpha2)) return null;
  return alpha2;
}

export type CodeErrorCode = 'INVALID_INPUT' | 'UNKNOWN_CODE';

/** Resolves a raw code field to an alpha-2 country code, distinguishing WHY
 * resolution failed: a malformed/out-of-shape input (INVALID_INPUT) versus a
 * syntactically plausible but unassigned code (UNKNOWN_CODE). Every node
 * should use this (not resolveAlpha2 directly) so error tokens are
 * consistent package-wide. */
export function classifyCode(raw: unknown): { alpha2: string | null; error: CodeErrorCode | null } {
  const normalized = normalizeCodeInput(raw);
  if (normalized === null) return { alpha2: null, error: 'INVALID_INPUT' };
  const alpha2 = resolveAlpha2(normalized);
  if (alpha2 === null) return { alpha2: null, error: 'UNKNOWN_CODE' };
  return { alpha2, error: null };
}

/** Regional-indicator-pair flag emoji for a validated alpha-2 code. Pure
 * computation — no dataset. */
export function flagEmojiFromAlpha2(alpha2: string): string {
  return [...alpha2.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

/** Reverses flagEmojiFromAlpha2: extracts the alpha-2 code encoded in a
 * two-regional-indicator flag emoji, or null if the input isn't shaped like
 * exactly one regional-indicator pair. Does NOT check the pair is an
 * assigned country — call resolveAlpha2 on the result for that. */
export function alpha2FromFlagEmoji(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 16) return null;
  const codePoints = [...trimmed];
  if (codePoints.length !== 2) return null;
  const letters: string[] = [];
  for (const cp of codePoints) {
    const point = cp.codePointAt(0)!;
    if (point < 0x1f1e6 || point > 0x1f1ff) return null;
    letters.push(String.fromCharCode(point - 0x1f1e6 + 65));
  }
  return letters.join('');
}

// --- ccTLD table -----------------------------------------------------------
// Source: IANA root-zone database (https://www.iana.org/domains/root/db).
// Every ISO 3166-1 alpha-2 code delegates a ccTLD identical to its own
// lowercased code, EXCEPT the handful listed below. This is our own compiled
// fact table (bare code->TLD assignments), not copied from any third-party
// package.
const TLD_OVERRIDES: Record<string, string> = {
  GB: 'uk', // "GB" is reserved in ISO 3166-1 at the UK's request; .gb was never delegated.
};
const TLD_UNASSIGNED = new Set(['BV', 'BL', 'MF', 'SJ']);

export function tldForAlpha2(alpha2: string): { tld: string; found: boolean } {
  if (TLD_UNASSIGNED.has(alpha2)) return { tld: '', found: false };
  const suffix = TLD_OVERRIDES[alpha2] ?? alpha2.toLowerCase();
  return { tld: `.${suffix}`, found: true };
}

// --- countries-list fact lookups -------------------------------------------

export interface CountryFacts {
  capital: string;
  continentCode: string;
  continentName: string;
  currencyCodes: string[];
  callingCodes: string[];
}

export function factsForAlpha2(alpha2: string): CountryFacts | null {
  const entry = (clCountries as Record<string, any>)[alpha2];
  if (!entry) return null;
  const continentCode: string = entry.continent || '';
  const continentName = continentCode ? (clContinents as Record<string, string>)[continentCode] || '' : '';
  return {
    capital: entry.capital || '',
    continentCode,
    continentName,
    currencyCodes: Array.isArray(entry.currency) ? entry.currency : entry.currency ? [entry.currency] : [],
    callingCodes: Array.isArray(entry.phone) ? entry.phone.map((p: number | string) => String(p)) : entry.phone !== undefined ? [String(entry.phone)] : [],
  };
}

export function nameForAlpha2(alpha2: string, lang: string): { name: string; langUsed: string } {
  const langUsed = ensureLocale(lang);
  const name = isoCountries.getName(alpha2, langUsed) || isoCountries.getName(alpha2, 'en') || '';
  return { name, langUsed };
}

/** Case-insensitive Levenshtein edit distance, bounded to short strings only
 * (callers must pre-bound both inputs) — used purely as glue to rank
 * approximate name matches, not to reimplement anything the ISO data
 * provides. */
export function levenshtein(a: string, b: string): number {
  const s = a.toLowerCase();
  const t = b.toLowerCase();
  const m = s.length;
  const n = t.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

export { isoCountries };
