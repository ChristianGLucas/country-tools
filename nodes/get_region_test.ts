import { CodeInput } from '../gen/messages_pb';
import { getRegion } from './get_region';
import { ctx } from './testkit';

function run(code: string) {
  const i = new CodeInput();
  i.setCode(code);
  return getRegion(ctx, i);
}

describe('GetRegion', () => {
  it('maps a country to its continent (hand-verified oracle: BR -> South America)', () => {
    const r = run('BR');
    expect(r.getFound()).toBe(true);
    expect(r.getContinentCode()).toBe('SA');
    expect(r.getContinentName()).toBe('South America');
  });

  it('maps another country to its continent (hand-verified oracle: JP -> Asia)', () => {
    const r = run('JP');
    expect(r.getFound()).toBe(true);
    expect(r.getContinentCode()).toBe('AS');
    expect(r.getContinentName()).toBe('Asia');
  });

  it('returns found=false for an unknown code, not a crash', () => {
    const r = run('ZZ');
    expect(r.getFound()).toBe(false);
    expect(r.getError()).toBe('UNKNOWN_CODE');
  });
});
