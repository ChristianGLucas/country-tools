import { CodeInput, CurrencyOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, factsForAlpha2 } from './lib';

/**
 * Look up the ISO 4217 currency code(s) a country uses, e.g. "CH" -> ["CHF"].
 * This is the static ISO reference mapping only — for locale-aware currency
 * DISPLAY formatting (symbol, decimal grouping, etc.) use
 * christiangeorgelucas/locale-tools' GetCurrencyInfo instead. Wraps
 * countries-list.
 */
export function getCurrency(ax: AxiomContext, input: CodeInput): CurrencyOutput {
  const out = new CurrencyOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  const facts = factsForAlpha2(alpha2);
  if (!facts || facts.currencyCodes.length === 0) {
    out.setFound(false);
    out.setError('CURRENCY_UNAVAILABLE');
    return out;
  }
  facts.currencyCodes.forEach((c) => out.addCurrencyCodes(c));
  out.setFound(true);
  return out;
}
