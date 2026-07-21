import { ConvertCodeInput, ConvertCodeOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { isoCountries, classifyCode } from './lib';

/**
 * Convert an ISO 3166-1 country code between alpha-2, alpha-3, and numeric
 * form — accepts any one of the three and returns all three, e.g. "USA" or
 * "840" or "us" -> { alpha2: "US", alpha3: "USA", numeric: "840" }. A code
 * that is not a real, assigned ISO 3166-1 country (including a well-formed
 * but unassigned 2/3-letter or numeric string) returns valid=false with all
 * code fields empty, never a guess. Wraps i18n-iso-countries.
 */
export function convertCode(ax: AxiomContext, input: ConvertCodeInput): ConvertCodeOutput {
  const out = new ConvertCodeOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setValid(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  out.setAlpha2(alpha2);
  out.setAlpha3(isoCountries.alpha2ToAlpha3(alpha2) || '');
  out.setNumeric(isoCountries.alpha2ToNumeric(alpha2) || '');
  out.setValid(true);
  return out;
}
