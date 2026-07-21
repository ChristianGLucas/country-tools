import { ConvertCodeInput } from '../gen/messages_pb';
import { convertCode } from './convert_code';
import { ctx } from './testkit';

function run(code: string) {
  const i = new ConvertCodeInput();
  i.setCode(code);
  return convertCode(ctx, i);
}

describe('ConvertCode', () => {
  it('round-trips alpha-3 -> {alpha2, alpha3, numeric}', () => {
    const r = run('USA');
    expect(r.getValid()).toBe(true);
    expect(r.getAlpha2()).toBe('US');
    expect(r.getAlpha3()).toBe('USA');
    expect(r.getNumeric()).toBe('840');
  });

  it('round-trips numeric -> {alpha2, alpha3, numeric}', () => {
    const r = run('840');
    expect(r.getValid()).toBe(true);
    expect(r.getAlpha2()).toBe('US');
    expect(r.getAlpha3()).toBe('USA');
  });

  it('is case-insensitive on alpha-2 input', () => {
    const r = run('jp');
    expect(r.getValid()).toBe(true);
    expect(r.getAlpha2()).toBe('JP');
    expect(r.getAlpha3()).toBe('JPN');
    expect(r.getNumeric()).toBe('392');
  });

  it('preserves a leading-zero numeric code (Afghanistan = 004)', () => {
    const r = run('004');
    expect(r.getValid()).toBe(true);
    expect(r.getAlpha2()).toBe('AF');
    expect(r.getNumeric()).toBe('004');
  });

  it('rejects a well-formed but unassigned alpha-2 code, never guessing', () => {
    const r = run('ZZ');
    expect(r.getValid()).toBe(false);
    expect(r.getAlpha2()).toBe('');
    expect(r.getAlpha3()).toBe('');
    expect(r.getNumeric()).toBe('');
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });

  it('rejects malformed input (wrong shape) as INVALID_INPUT, not UNKNOWN_CODE', () => {
    const r = run('U$A!');
    expect(r.getValid()).toBe(false);
    expect(r.getError()).toBe('INVALID_INPUT');
  });

  it('rejects empty input without crashing', () => {
    const r = run('');
    expect(r.getValid()).toBe(false);
    expect(r.getError()).toBe('INVALID_INPUT');
  });

  it('rejects oversized input without crashing', () => {
    const r = run('A'.repeat(10000));
    expect(r.getValid()).toBe(false);
    expect(r.getError()).toBe('INVALID_INPUT');
  });
});
