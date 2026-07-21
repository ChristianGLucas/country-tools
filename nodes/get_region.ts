import { CodeInput, RegionOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, factsForAlpha2 } from './lib';

/**
 * Map a country to its continent, e.g. "BR" -> { continent_code: "SA",
 * continent_name: "South America" }. The underlying permissively-licensed
 * dataset provides continent granularity only (no UN region/subregion
 * breakdown) — see the package README for why finer-grained region data was
 * left out. Wraps countries-list.
 */
export function getRegion(ax: AxiomContext, input: CodeInput): RegionOutput {
  const out = new RegionOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  const facts = factsForAlpha2(alpha2);
  if (!facts || !facts.continentCode) {
    out.setFound(false);
    out.setError('REGION_UNAVAILABLE');
    return out;
  }
  out.setContinentCode(facts.continentCode);
  out.setContinentName(facts.continentName);
  out.setFound(true);
  return out;
}
