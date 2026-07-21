import { CodeInput } from '../gen/messages_pb';
import { getCallingCode } from './get_calling_code';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getCallingCode(ctx, i);
}

describe('GetCallingCode', () => {
  it('looks up a well-known single calling code (hand-verified oracle: GB = +44)', () => {
    const r = run('GB');
    expect(r.getFound()).toBe(true);
    expect(r.getCallingCodesList()).toEqual(['44']);
  });

  it('looks up another well-known calling code (hand-verified oracle: JP = +81)', () => {
    const r = run('JP');
    expect(r.getFound()).toBe(true);
    expect(r.getCallingCodesList()).toEqual(['81']);
  });

  it('accepts any code form', () => {
    const r = run('USA');
    expect(r.getFound()).toBe(true);
    expect(r.getCallingCodesList()).toEqual(['1']);
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });
});
