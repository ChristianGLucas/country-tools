import { CodeInput, CallingCodeOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, factsForAlpha2 } from './lib';

/**
 * Look up a country's calling/dialing code(s) without the "+", e.g. "GB" ->
 * ["44"]. A country can have more than one historically-used code (e.g.
 * Kazakhstan also uses "7") — all are returned. This is the static ISO/ITU
 * reference mapping, not phone-number parsing or validation (pair with
 * christiangeorgelucas/phone-tools for that). Wraps countries-list.
 */
export function getCallingCode(ax: AxiomContext, input: CodeInput): CallingCodeOutput {
  const out = new CallingCodeOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  const facts = factsForAlpha2(alpha2);
  if (!facts || facts.callingCodes.length === 0) {
    out.setFound(false);
    out.setError('CALLING_CODE_UNAVAILABLE');
    return out;
  }
  facts.callingCodes.forEach((c) => out.addCallingCodes(c));
  out.setFound(true);
  return out;
}
