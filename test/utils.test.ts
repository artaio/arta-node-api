import { createDateAsUTC } from '../lib/utils';

test('ensure date is parsed as UTC', () => {
  const strDate = '2022-10-20T17:01:32.892689';
  const date = createDateAsUTC(strDate);
  expect(date.toISOString()).toEqual('2022-10-20T17:01:32.892Z');
});
