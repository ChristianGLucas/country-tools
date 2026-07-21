import { CodeInput } from '../gen/messages_pb';
import { validateCountryCode } from './validate_country_code';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return validateCountryCode(ctx, i);
}

describe('ValidateCountryCode', () => {
  it('validates a real alpha-2 code', () => {
    const r = run('US');
    expect(r.getValid()).toBe(true);
    expect(r.getFormatDetected()).toBe('alpha2');
    expect(r.getNormalizedAlpha2()).toBe('US');
  });

  it('validates a real alpha-3 code', () => {
    const r = run('deu');
    expect(r.getValid()).toBe(true);
    expect(r.getFormatDetected()).toBe('alpha3');
    expect(r.getNormalizedAlpha2()).toBe('DE');
  });

  it('validates a real numeric code', () => {
    const r = run('392');
    expect(r.getValid()).toBe(true);
    expect(r.getFormatDetected()).toBe('numeric');
    expect(r.getNormalizedAlpha2()).toBe('JP');
  });

  it('rejects a well-formed but unassigned alpha-2 code (the toAlpha2 permissiveness trap)', () => {
    // i18n-iso-countries' own toAlpha2('XX') blindly upper-cases and returns
    // "XX" without checking it is a real country — this node must not
    // inherit that permissiveness.
    const r = run('XX');
    expect(r.getValid()).toBe(false);
    expect(r.getFormatDetected()).toBe('alpha2');
    expect(r.getNormalizedAlpha2()).toBe('');
  });

  it('reports format_detected=unknown for a malformed shape', () => {
    const r = run('1234567890');
    expect(r.getValid()).toBe(false);
    expect(r.getFormatDetected()).toBe('unknown');
  });

  it('handles empty input without crashing', () => {
    const r = run('');
    expect(r.getValid()).toBe(false);
  });
});
