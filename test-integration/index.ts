import { Arta } from '../lib/index';

export const arta = new Arta(process.env.ARTA_API_KEY!, {
  host: 'api.qa.arta.io',
});
