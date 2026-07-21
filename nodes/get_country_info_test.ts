import { CodeInput } from '../gen/messages_pb';
import { getCountryInfo } from './get_country_info';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getCountryInfo(ctx, i);
}

describe('GetCountryInfo', () => {
  it('aggregates every fact for a well-known country (hand-verified oracle: FR)', () => {
    const r = run('FR');
    expect(r.getFound()).toBe(true);
    expect(r.getAlpha2()).toBe('FR');
    expect(r.getAlpha3()).toBe('FRA');
    expect(r.getNumeric()).toBe('250');
    expect(r.getName()).toBe('France');
    expect(r.getCapital()).toBe('Paris');
    expect(r.getContinentCode()).toBe('EU');
    expect(r.getContinentName()).toBe('Europe');
    expect(r.getCurrencyCodesList()).toEqual(['EUR']);
    expect(r.getCallingCodesList()).toEqual(['33']);
    expect(r.getTld()).toBe('.fr');
    expect(r.getTldFound()).toBe(true);
    expect(r.getFlagEmoji()).toBe('\u{1F1EB}\u{1F1F7}');
  });

  it('reflects the GB ccTLD exception in the aggregate record too', () => {
    const r = run('GB');
    expect(r.getFound()).toBe(true);
    expect(r.getTld()).toBe('.uk');
  });

  it('returns found=false for an unknown code, with every other field empty', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
    expect(r.getAlpha2()).toBe('');
    expect(r.getName()).toBe('');
  });
});
