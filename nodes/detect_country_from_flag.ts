import { DetectFlagInput, DetectFlagOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { alpha2FromFlagEmoji, isoCountries, resolveAlpha2 } from './lib';

/**
 * Detect the country from its flag emoji — the reverse of GetFlagEmoji, e.g.
 * "🇯🇵" -> "JP" Japan. found=false when the input is not shaped like exactly
 * one regional-indicator-pair flag emoji, OR when the pair decodes to a
 * two-letter combination with no assigned ISO 3166-1 country (a small
 * number of regional-indicator pairs render as a flag-like glyph on some
 * platforms without being a real country, e.g. certain territory codes).
 */
export function detectCountryFromFlag(ax: AxiomContext, input: DetectFlagInput): DetectFlagOutput {
  const out = new DetectFlagOutput();
  const decoded = alpha2FromFlagEmoji(input.getEmoji());
  if (!decoded) {
    out.setFound(false);
    out.setError('INVALID_INPUT');
    return out;
  }
  const alpha2 = resolveAlpha2(decoded);
  if (!alpha2) {
    out.setFound(false);
    out.setError('UNKNOWN_CODE');
    return out;
  }
  out.setAlpha2(alpha2);
  out.setAlpha3(isoCountries.alpha2ToAlpha3(alpha2) || '');
  out.setName(isoCountries.getName(alpha2, 'en') || '');
  out.setFound(true);
  return out;
}
