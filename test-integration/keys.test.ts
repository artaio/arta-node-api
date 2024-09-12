import { arta } from '.';
import { createPaginatedResponseSchema, keySchema } from '../schemas';
import type { Page } from '../lib/pagination';
import type { Key } from '../lib';

describe('tests keys Arta endpoint', () => {
  it('should be able CRUD api keys', async () => {
    const keys = await arta.keys.list();
    const parsedKeys = createPaginatedResponseSchema(keySchema).parse(
      keys,
    ) satisfies Page<Key>;
    expect(parsedKeys.items.length).toBeGreaterThan(0);

    const key = await arta.keys.create({
      name: 'test key',
      is_testing: true,
    });
    const parsedKey = keySchema.parse(key) satisfies Key;
    expect(parsedKey.name).toBe('test key');

    const key2 = await arta.keys.getById(parsedKey.id);
    const parsedKey2 = keySchema.parse(key2) satisfies Key;
    expect(parsedKey2.name).toBe('test key');

    await arta.keys.remove(parsedKey.id);
  });
});
