import { CodeInput } from '../gen/messages_pb';
import { getCurrency } from './get_currency';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getCurrency(ctx, i);
}

describe('GetCurrency', () => {
  it('looks up Switzerland (hand-verified oracle: uses CHF, plus the ISO 4217 WIR-franc pair CHE/CHW)', () => {
    const r = run('CH');
    expect(r.getFound()).toBe(true);
    expect(r.getCurrencyCodesList()).toContain('CHF');
  });

  it('looks up a euro-zone country (hand-verified oracle: DE -> EUR)', () => {
    const r = run('DE');
    expect(r.getFound()).toBe(true);
    expect(r.getCurrencyCodesList()).toEqual(['EUR']);
  });

  it('accepts any code form', () => {
    const r = run('392'); // Japan numeric
    expect(r.getFound()).toBe(true);
    expect(r.getCurrencyCodesList()).toEqual(['JPY']);
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });
});
