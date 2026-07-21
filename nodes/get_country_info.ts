import { CodeInput, Country } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, isoCountries, flagEmojiFromAlpha2, tldForAlpha2, factsForAlpha2 } from './lib';

/**
 * Look up every fact this package knows about one country in a single call —
 * codes, English name, flag emoji, capital, continent, currency code(s),
 * calling code(s), and ccTLD — e.g. "FR" -> the full French record.
 * Convenient when a caller needs several facts at once instead of chaining
 * individual lookups; each individual node (GetName, GetCurrency, GetTLD,
 * ...) remains available for a single fact. found=false for an unknown code.
 */
export function getCountryInfo(ax: AxiomContext, input: CodeInput): Country {
  const out = new Country();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }

  out.setAlpha2(alpha2);
  out.setAlpha3(isoCountries.alpha2ToAlpha3(alpha2) || '');
  out.setNumeric(isoCountries.alpha2ToNumeric(alpha2) || '');
  out.setName(isoCountries.getName(alpha2, 'en') || '');
  out.setFlagEmoji(flagEmojiFromAlpha2(alpha2));

  const { tld, found: tldFound } = tldForAlpha2(alpha2);
  out.setTld(tld);
  out.setTldFound(tldFound);

  const facts = factsForAlpha2(alpha2);
  if (facts) {
    out.setCapital(facts.capital);
    out.setContinentCode(facts.continentCode);
    out.setContinentName(facts.continentName);
    facts.currencyCodes.forEach((c) => out.addCurrencyCodes(c));
    facts.callingCodes.forEach((c) => out.addCallingCodes(c));
  }

  out.setFound(true);
  return out;
}
