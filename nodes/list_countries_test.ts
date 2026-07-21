import { ListCountriesInput } from '../gen/messages_pb';
import { listCountries } from './list_countries';
import { ctx } from './testkit';

function run(continentCode = '') {
  const i = new ListCountriesInput();
  i.setContinentCode(continentCode);
  return listCountries(ctx, i);
}

describe('ListCountries', () => {
  it('lists all 250 ISO 3166-1 countries when unfiltered', () => {
    const r = run();
    expect(r.getCount()).toBe(250);
    expect(r.getCountriesList().length).toBe(250);
  });

  it('is sorted by alpha-2 code', () => {
    const codes = run().getCountriesList().map((c) => c.getAlpha2());
    const sorted = [...codes].sort();
    expect(codes).toEqual(sorted);
  });

  it('includes a known country with all three codes populated', () => {
    const r = run();
    const us = r.getCountriesList().find((c) => c.getAlpha2() === 'US');
    expect(us).toBeDefined();
    expect(us!.getAlpha3()).toBe('USA');
    expect(us!.getNumeric()).toBe('840');
    expect(us!.getName()).toBe('United States of America');
  });

  it('filters to one continent', () => {
    const r = run('EU');
    const codes = r.getCountriesList().map((c) => c.getAlpha2());
    expect(codes).toContain('DE');
    expect(codes).toContain('FR');
    expect(codes).not.toContain('US');
    expect(codes).not.toContain('JP');
    expect(r.getCount()).toBe(codes.length);
    expect(r.getCount()).toBeGreaterThan(20);
    expect(r.getCount()).toBeLessThan(60);
  });

  it('ignores a malformed continent filter rather than crashing (returns everything)', () => {
    const r = run('not-a-continent');
    expect(r.getCount()).toBe(250);
  });
});
