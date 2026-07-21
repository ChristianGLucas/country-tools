import { CodeInput } from '../gen/messages_pb';
import { getTLD } from './get_tld';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getTLD(ctx, i);
}

describe('GetTLD', () => {
  it('returns the default alpha-2-derived TLD (hand-verified oracle: DE -> .de)', () => {
    const r = run('DE');
    expect(r.getFound()).toBe(true);
    expect(r.getTld()).toBe('.de');
  });

  it('returns the exception TLD for the UK (hand-verified oracle: GB -> .uk, not .gb)', () => {
    const r = run('GB');
    expect(r.getFound()).toBe(true);
    expect(r.getTld()).toBe('.uk');
  });

  it('returns found=false for an ISO code with no delegated ccTLD (Bouvet Island)', () => {
    const r = run('BV');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });
});
