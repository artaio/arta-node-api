const { Arta } = require('../dist/lib');

const ping = (webhook) => {
  return webhook.ping().catch(() => {});
};

const main = async () => {
  const arta = new Arta('7npicsoqVXMIu8cyi5T4UpXV');

  const pings = [];
  for await (const webhook of arta.webhooks.listAll()) {
    pings.push(ping(webhook));
  }

  await Promise.all(pings);

  const keys = [];
  for (let i = 0; i < 50; i++) {
    keys.push(arta.keys.create({ is_testing: true }));
  }
  await Promise.all(keys);

  console.log(await arta.keys.list());

  const ids = [];
  for await (const key of arta.keys.listAll()) {
    //console.log(key);
    ids.push(key.id);
  }

  console.log(ids);
};

main();
