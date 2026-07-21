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

  it('returns found=false for an ISO code with no delegated ccTLD (Saint Barthélemy)', () => {
    const r = run('BL');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=false for Saint Martin (French part)', () => {
    const r = run('MF');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=false for Bonaire, Sint Eustatius and Saba', () => {
    const r = run('BQ');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=false for Western Sahara (.eh is listed "not assigned" in the IANA root zone, not a live delegation)', () => {
    const r = run('EH');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=false for US Minor Outlying Islands (.um was delegated then formally revoked in 2007)', () => {
    const r = run('UM');
    expect(r.getFound()).toBe(false);
    expect(r.getTld()).toBe('');
    expect(r.getError()).toBe('TLD_UNASSIGNED');
  });

  it('returns found=true for Bouvet Island and Svalbard & Jan Mayen — commonly mis-cited as unassigned, but their IANA delegation records are live (Norid A/S)', () => {
    const bv = run('BV');
    expect(bv.getFound()).toBe(true);
    expect(bv.getTld()).toBe('.bv');
    const sj = run('SJ');
    expect(sj.getFound()).toBe(true);
    expect(sj.getTld()).toBe('.sj');
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });
});
