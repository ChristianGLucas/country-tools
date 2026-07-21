import { DetectFlagInput } from '../gen/messages_pb';
import { detectCountryFromFlag } from './detect_country_from_flag';
import { getFlagEmoji } from './get_flag_emoji';
import { CodeInput } from '../gen/messages_pb';
import { ctx } from './testkit';

function run(emoji: string) {
  const i = new DetectFlagInput();
  i.setEmoji(emoji);
  return detectCountryFromFlag(ctx, i);
}

describe('DetectCountryFromFlag', () => {
  it('decodes a known flag emoji (hand-verified oracle: US flag -> US)', () => {
    const r = run('\u{1F1FA}\u{1F1F8}');
    expect(r.getFound()).toBe(true);
    expect(r.getAlpha2()).toBe('US');
    expect(r.getAlpha3()).toBe('USA');
    expect(r.getName()).toBe('United States of America');
  });

  it('round-trips through GetFlagEmoji for every ISO country (self-consistency)', () => {
    const codes = ['US', 'DE', 'JP', 'GB', 'BR', 'ZA', 'IN', 'FR', 'CA', 'AU', 'KR', 'MX'];
    for (const code of codes) {
      const flagInput = new CodeInput();
      flagInput.setCode(code);
      const emoji = getFlagEmoji(ctx, flagInput).getEmoji();
      const detected = run(emoji);
      expect(detected.getFound()).toBe(true);
      expect(detected.getAlpha2()).toBe(code);
    }
  });

  it('returns found=false for a non-flag string, not a crash', () => {
    const r = run('hello');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('INVALID_INPUT');
  });

  it('returns found=false for a single regional-indicator letter', () => {
    const r = run('\u{1F1FA}');
    expect(r.getFound()).toBe(false);
  });

  it('returns found=false for an empty string, not a crash', () => {
    const r = run('');
    expect(r.getFound()).toBe(false);
  });

  it('returns found=false for oversized input, not a crash', () => {
    const r = run('x'.repeat(10000));
    expect(r.getFound()).toBe(false);
  });
});
