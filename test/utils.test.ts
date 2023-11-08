import { createDateAsUTC, convertDatesToUtc } from '../lib/utils';

test('ensure date is parsed as UTC', () => {
  const strDate = '2022-10-20T17:01:32.892689';
  const date = createDateAsUTC(strDate);
  expect(date.toISOString()).toEqual('2022-10-20T17:01:32.892Z');
});

test('convert arta resources to Date', () => {
  const notParsed = {
    smtelse: 'test',
    created_at: '2022-10-20T17:01:32.892689',
  };

  const parsed = convertDatesToUtc(notParsed);
  expect(parsed.created_at?.toISOString()).toEqual('2022-10-20T17:01:32.892Z');
});
