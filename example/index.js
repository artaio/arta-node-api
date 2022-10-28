const { Arta } = require('../dist');

const main = async () => {
  const arta = new Arta('7npicsoqVXMIu8cyi5T4UpXV');

  const webhook = await arta.webhook.create({
    name: 'other test',
    url: 'https://notifications.example.com/',
  });

  await arta.webhook.ping(webhook.id);
  await webhook.ping();
};

main();
