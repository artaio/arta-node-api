import { Arta } from '../lib';

describe('tests arta-node sdk creation', () => {
  it('should instatiate an arta sdk', () => {
    const arta = new Arta('my_secret_key');
    expect(arta).not.toBe(null);
  });
});
