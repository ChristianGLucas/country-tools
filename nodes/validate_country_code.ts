import { CodeInput, ValidateCodeOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, detectFormat, normalizeCodeInput } from './lib';

/**
 * Validate whether a string is a real ISO 3166-1 country code in ANY form
 * (alpha-2, alpha-3, or numeric) — e.g. "US"/"USA"/"840" -> valid=true,
 * format_detected accordingly; "ZZ" (well-formed but unassigned) or "usaa"
 * (malformed shape) -> valid=false. Unlike ConvertCode this never fabricates
 * a normalized value for an invalid code. Wraps i18n-iso-countries.
 */
export function validateCountryCode(ax: AxiomContext, input: CodeInput): ValidateCodeOutput {
  const out = new ValidateCodeOutput();
  const raw = input.getCode();
  const normalized = normalizeCodeInput(raw);
  const format = normalized ? detectFormat(normalized) : 'unknown';
  out.setFormatDetected(format);

  const { alpha2, error } = classifyCode(raw);
  if (!alpha2) {
    out.setValid(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  out.setValid(true);
  out.setNormalizedAlpha2(alpha2);
  return out;
}
