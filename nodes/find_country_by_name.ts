import { FindByNameInput, FindByNameOutput, NameMatch } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { ensureLocale, isoCountries, levenshtein } from './lib';

const MAX_QUERY_LEN = 128;
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 50;

/**
 * Find countries whose name matches a query string, in a given language —
 * the inverse of GetName, e.g. "korea" -> ["KR" South Korea, "KP" North
 * Korea] (substring match); "Untied Kingdom" -> "GB" United Kingdom
 * (fuzzy=true, edit-distance match) when there is no exact/substring hit.
 * Matches are ranked by score (1.0 = exact case-insensitive match, down to
 * an edit-distance-derived score for fuzzy hits) and capped at `limit`
 * (default 5, max 50). An empty or oversized query returns no matches.
 * Wraps i18n-iso-countries' localized name data.
 */
export function findCountryByName(ax: AxiomContext, input: FindByNameInput): FindByNameOutput {
  const out = new FindByNameOutput();
  const rawQuery = input.getName();
  if (typeof rawQuery !== 'string') return out;
  const query = rawQuery.trim();
  if (!query || query.length > MAX_QUERY_LEN) return out;

  const lang = ensureLocale(input.getLang());
  const limitField = input.getLimit();
  const limit = Math.min(MAX_LIMIT, limitField > 0 ? limitField : DEFAULT_LIMIT);
  const fuzzy = input.getFuzzy();
  const lowerQuery = query.toLowerCase();

  const names = isoCountries.getNames(lang) as Record<string, string>;
  type Scored = { alpha2: string; name: string; score: number };
  const exact: Scored[] = [];
  const substring: Scored[] = [];
  const approx: Scored[] = [];

  for (const [alpha2, name] of Object.entries(names)) {
    const lowerName = name.toLowerCase();
    if (lowerName === lowerQuery) {
      exact.push({ alpha2, name, score: 1.0 });
    } else if (lowerName.includes(lowerQuery) || lowerQuery.includes(lowerName)) {
      substring.push({ alpha2, name, score: 0.85 });
    } else if (fuzzy) {
      const dist = levenshtein(lowerQuery, lowerName);
      const maxLen = Math.max(lowerQuery.length, lowerName.length);
      const score = maxLen === 0 ? 0 : 1 - dist / maxLen;
      if (score >= 0.6) approx.push({ alpha2, name, score });
    }
  }

  approx.sort((a, b) => b.score - a.score);
  const ranked = [...exact, ...substring, ...approx].slice(0, limit);

  for (const r of ranked) {
    const m = new NameMatch();
    m.setAlpha2(r.alpha2);
    m.setAlpha3(isoCountries.alpha2ToAlpha3(r.alpha2) || '');
    m.setNumeric(isoCountries.alpha2ToNumeric(r.alpha2) || '');
    m.setName(r.name);
    m.setScore(r.score);
    out.addMatches(m);
  }
  return out;
}
