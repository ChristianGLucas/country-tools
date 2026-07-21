import { CodeInput, FlagEmojiOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { classifyCode, flagEmojiFromAlpha2 } from './lib';

/**
 * Compute a country's flag emoji from its ISO 3166-1 alpha-2 code (accepts
 * any code form) — a pure regional-indicator-pair computation, e.g. "JP" ->
 * "🇯🇵". No dataset lookup; found=false only when the code itself is not a
 * real, assigned ISO 3166-1 country.
 */
export function getFlagEmoji(ax: AxiomContext, input: CodeInput): FlagEmojiOutput {
  const out = new FlagEmojiOutput();
  const { alpha2, error } = classifyCode(input.getCode());
  if (!alpha2) {
    out.setFound(false);
    out.setError(error || 'UNKNOWN_CODE');
    return out;
  }
  out.setEmoji(flagEmojiFromAlpha2(alpha2));
  out.setFound(true);
  return out;
}
