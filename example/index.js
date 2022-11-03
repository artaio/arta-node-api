const { Arta } = require('../dist');

const ping = (webhook) => {
  return webhook
    .ping()
    .catch(() =>
      console.warn(`Endpoint ${webhook.id}/${webhook.name} is offline`)
    );
};

const main = async () => {
  const arta = new Arta('7npicsoqVXMIu8cyi5T4UpXV');

  const pings = [];
  const results = [];
  for await (const webhook of arta.webhooks.listAll()) {
    console.log(webhook);
    pings.push(
      webhook
        .ping()
        .then(() => results.push(`Ping on ${webhook.id}/${webhook.url} OK`))
        .catch(() =>
          results.push(`Ping on ${webhook.id}/${webhook.url} failed`)
        )
    );
  }

  await Promise.all(pings);
};

main();
