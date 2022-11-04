const { Arta } = require('../dist/lib');

const ping = (webhook) => {
  return webhook.ping().catch(() => {});
};

const main = async () => {
  const arta = new Arta('7npicsoqVXMIu8cyi5T4UpXV');

  const pings = [];
  for await (const webhook of arta.webhook.listAll()) {
    pings.push(ping(webhook));
  }

  await Promise.all(pings);
};

main();
