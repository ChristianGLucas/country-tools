import { ListCountriesInput, ListCountriesOutput, CountrySummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { ensureLocale, isoCountries, factsForAlpha2 } from './lib';

const CONTINENT_CODE_RE = /^[A-Za-z]{2}$/;

/**
 * List every ISO 3166-1 country as (alpha-2, alpha-3, numeric, name),
 * optionally filtered to one continent (e.g. continent_code="EU" -> just
 * Europe). Sorted by alpha-2 code for a stable, deterministic order. Wraps
 * i18n-iso-countries for the code/name list and countries-list for the
 * continent filter.
 */
export function listCountries(ax: AxiomContext, input: ListCountriesInput): ListCountriesOutput {
  const out = new ListCountriesOutput();
  const lang = ensureLocale(input.getLang());
  const continentFilterRaw = input.getContinentCode();
  const continentFilter =
    typeof continentFilterRaw === 'string' && CONTINENT_CODE_RE.test(continentFilterRaw.trim())
      ? continentFilterRaw.trim().toUpperCase()
      : '';

  const names = isoCountries.getNames(lang) as Record<string, string>;
  const alpha2Codes = Object.keys(names).sort();

  let count = 0;
  for (const alpha2 of alpha2Codes) {
    if (continentFilter) {
      const facts = factsForAlpha2(alpha2);
      if (!facts || facts.continentCode !== continentFilter) continue;
    }
    const summary = new CountrySummary();
    summary.setAlpha2(alpha2);
    summary.setAlpha3(isoCountries.alpha2ToAlpha3(alpha2) || '');
    summary.setNumeric(isoCountries.alpha2ToNumeric(alpha2) || '');
    summary.setName(names[alpha2]);
    out.addCountries(summary);
    count++;
  }
  out.setCount(count);
  return out;
}
