import { FindByNameInput } from '../gen/messages_pb';
import { findCountryByName } from './find_country_by_name';
import { ctx } from './testkit';

function run(name: string, opts: { fuzzy?: boolean; limit?: number; lang?: string } = {}) {
  const i = new FindByNameInput();
  i.setName(name);
  i.setFuzzy(opts.fuzzy ?? true);
  if (opts.limit !== undefined) i.setLimit(opts.limit);
  i.setLang(opts.lang ?? 'en');
  return findCountryByName(ctx, i);
}

describe('FindCountryByName', () => {
  it('finds an exact (case-insensitive) match with score 1.0', () => {
    const r = run('united states of america');
    const matches = r.getMatchesList();
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].getAlpha2()).toBe('US');
    expect(matches[0].getScore()).toBe(1.0);
  });

  it('finds multiple substring matches for an ambiguous partial name', () => {
    const r = run('korea', { fuzzy: false });
    const codes = r.getMatchesList().map((m) => m.getAlpha2());
    expect(codes).toEqual(expect.arrayContaining(['KR', 'KP']));
  });

  it('finds a fuzzy match for a misspelled name when fuzzy=true', () => {
    const r = run('Untied Kingdom', { fuzzy: true });
    const codes = r.getMatchesList().map((m) => m.getAlpha2());
    expect(codes).toContain('GB');
  });

  it('returns no matches for a misspelled name when fuzzy=false', () => {
    const r = run('Untied Kingdom', { fuzzy: false });
    expect(r.getMatchesList().length).toBe(0);
  });

  it('respects the limit, capped at 50', () => {
    const r = run('a', { fuzzy: false, limit: 3 });
    expect(r.getMatchesList().length).toBeLessThanOrEqual(3);
  });

  it('returns no matches, not a crash, for an empty query', () => {
    const r = run('');
    expect(r.getMatchesList().length).toBe(0);
  });

  it('returns no matches, not a crash, for an oversized query', () => {
    const r = run('a'.repeat(10000));
    expect(r.getMatchesList().length).toBe(0);
  });
});
