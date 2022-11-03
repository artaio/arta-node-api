export function makeAuthHeader(apiKey: string) {
  return `ARTA_APIKey ${apiKey}`;
}
