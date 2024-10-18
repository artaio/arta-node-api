import { arta } from '.';
import { createPaginatedResponseSchema, tagSchema } from '../schemas';
import type { Page } from '../lib/pagination';
import type { Tag } from '../lib';

const generateRandomString = (length = 8) =>
  Array.from({ length }, () => Math.random().toString(36)[2]).join('');

describe('tests tags Arta endpoint', () => {
  it('should be able create, read, update and list tags', async () => {
    const tags = await arta.tags.list();

    const parsedTags = createPaginatedResponseSchema(tagSchema).parse(
      tags,
    ) satisfies Page<Tag>;
    const totalTags = parsedTags.items.length;

    const randomTagName = generateRandomString();

    const tag = await arta.tags.create({
      name: randomTagName,
      description: 'test description',
      color: 'D7D6D0',
      is_active: true,
    });

    const parsedTag = tag;
    expect(parsedTag.name).toBe(randomTagName);

    const tagByName = await arta.tags.getByName(parsedTag.name);
    const parsedTagByName = tagSchema.parse(tagByName) satisfies Tag;
    expect(parsedTagByName.name).toBe(randomTagName);
    expect(parsedTagByName.color).toBe('D7D6D0');
    expect(parsedTagByName.is_active).toBe(true);

    const tags2 = await arta.tags.list();
    const parsedTags2 = createPaginatedResponseSchema(tagSchema).parse(
      tags2,
    ) satisfies Page<Tag>;

    expect(parsedTags2.items.length).toBe(totalTags + 1);

    await arta.tags.update(randomTagName, {
      color: '00ff00',
    });

    const tagUpdated = await arta.tags.getByName(randomTagName);

    const parsedTagUpdated = tagSchema.parse(tagUpdated) satisfies Tag;
    expect(parsedTagUpdated.name).toBe(randomTagName);
    expect(parsedTagUpdated.color).toBe('00ff00');
  });
});
