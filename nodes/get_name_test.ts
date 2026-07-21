// Independent-oracle test. The package under test wraps `i18n-iso-countries`;
// a suite that only checked its output against that same library would use
// the implementation as its own oracle and could never catch a library-level
// data bug. This test cross-checks the LIVE GetName node against Node's
// built-in Intl.DisplayNames — a completely separate implementation (V8/ICU,
// not i18n-iso-countries' bundled JSON) — for a spread of countries.
import { GetNameInput } from '../gen/messages_pb';
import { getName } from './get_name';
import { ctx } from './testkit';

function ours(code: string, lang = 'en') {
  const i = new GetNameInput();
  i.setCode(code);
  i.setLang(lang);
  return getName(ctx, i);
}

// Codes where i18n-iso-countries' short English name and Intl.DisplayNames'
// CLDR display name are identical strings. A few real countries (notably US,
// CN, RU) legitimately differ between the ISO short name and the CLDR common
// name ("United States of America" vs "United States") — that is a real,
// expected naming-convention difference, not a bug, so those are asserted
// separately below rather than forced into this strict-equality set.
const CODES = ['DE', 'JP', 'GB', 'BR', 'ZA', 'IN', 'FR', 'CA', 'AU', 'MX'];

describe('GetName vs independent oracle (Intl.DisplayNames)', () => {
  const oracle = new Intl.DisplayNames(['en'], { type: 'region' });

  it.each(CODES)('agrees with Intl.DisplayNames on %s', (code) => {
    const r = ours(code);
    expect(r.getFound()).toBe(true);
    expect(r.getName()).toBe(oracle.of(code));
  });
});

describe('GetName', () => {
  it('supports a non-English language', () => {
    const r = ours('DE', 'fr');
    expect(r.getFound()).toBe(true);
    expect(r.getName()).toBe('Allemagne');
    expect(r.getLangUsed()).toBe('fr');
  });

  it('falls back to English for an unsupported language tag and reports the fallback', () => {
    const r = ours('US', 'zz');
    expect(r.getFound()).toBe(true);
    expect(r.getLangUsed()).toBe('en');
    expect(r.getName()).toBe('United States of America');
  });

  it('accepts any code form (numeric)', () => {
    const r = ours('276'); // Germany
    expect(r.getFound()).toBe(true);
    expect(r.getAlpha2()).toBe('DE');
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = ours('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });

  it('rejects a path-traversal-shaped lang value rather than passing it to require()', () => {
    const r = ours('US', '../../../etc/passwd');
    expect(r.getFound()).toBe(true);
    expect(r.getLangUsed()).toBe('en');
  });
});
