import { CodeInput } from '../gen/messages_pb';
import { getFlagEmoji } from './get_flag_emoji';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getFlagEmoji(ctx, i);
}

describe('GetFlagEmoji', () => {
  it('computes the US flag (hand-verified oracle: U+1F1FA U+1F1F8)', () => {
    const r = run('US');
    expect(r.getFound()).toBe(true);
    expect(r.getEmoji()).toBe('\u{1F1FA}\u{1F1F8}');
  });

  it('computes the Japan flag (hand-verified oracle: U+1F1EF U+1F1F5)', () => {
    const r = run('JP');
    expect(r.getFound()).toBe(true);
    expect(r.getEmoji()).toBe('\u{1F1EF}\u{1F1F5}');
  });

  it('accepts any code form', () => {
    const r = run('FRA');
    expect(r.getFound()).toBe(true);
    expect(r.getEmoji()).toBe('\u{1F1EB}\u{1F1F7}');
  });

  it('returns found=false for an unassigned code, not a fabricated glyph', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getEmoji()).toBe('');
  });
});
