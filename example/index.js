const { Arta } = require('../dist/lib');

const ping = (webhook) => {
  return webhook.ping().catch(() => {});
};

const main = async () => {
  const arta = new Arta('7npicsoqVXMIu8cyi5T4UpXV');

  const uploads = await arta.uploads.list();
  console.log(uploads);
};

main();
