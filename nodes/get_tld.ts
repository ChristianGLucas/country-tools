import { CodeInput, TLDOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, tldForAlpha2 } from './lib';

/**
 * Look up a country's ccTLD (country-code top-level domain), including the
 * leading dot, e.g. "US" -> ".us", "GB" -> ".uk" (the one case where the
 * delegated ccTLD differs from the lowercased ISO code). found=false for the
 * handful of ISO 3166-1 codes with no delegated ccTLD at all (Saint
 * Barthélemy, Saint Martin, Western Sahara, US Minor Outlying Islands,
 * Bonaire/Sint Eustatius/Saba) or for an unknown country code. Sourced from
 * IANA's own per-code root-zone delegation records.
 */
export function getTLD(ax: AxiomContext, input: CodeInput): TLDOutput {
  const out = new TLDOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  const { tld, found } = tldForAlpha2(alpha2);
  out.setTld(tld);
  out.setFound(found);
  if (!found) out.setError('TLD_UNASSIGNED');
  return out;
}
