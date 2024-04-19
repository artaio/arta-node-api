### Pre-release notice

arta-node-api is in a pre-release beta. The package's API is unstable and expected to change prior to public release. Please only make use of the package in coordination with ARTA during this period.

Arta Node.js Library
===

The Arta Node library provides a seamless integration to Arta API for applications running on Node.js 18+ or any platform using [Serverless JS](https://www.cloudflare.com/learning/serverless/serverless-javascript/) using both Typescript or Javascript.

It is a very light package with zero runtime dependencies using only the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) Web API.

## Documentation

Please refer to [Arta official documentation](https://api-reference.arta.io/).


## Getting Started

### 1. Install Arta Node Library

```
$ npm install @artaio/node-api
```

### 2. Use it to interact with our API in pure JS
```js
const { Arta } = require('@artaio/node-api');
const arta = new Arta('<YOUR_API_TOKEN>');

const { items } = arta.webhooks.list();
const myHook = items[0];

myHook.ping().then(console.log);
```

### 3. Use it to interact with our API in TS
```ts
import { Arta, Webhook } from '@artaio/node-api';
const arta: Arta = new Arta('<YOUR_API_TOKEN>');

const { items } = arta.webhooks.list();
const myHook: Webhook = items[0];

myHook.ping().then(console.log);
```

## Environment
**WARNING**: Arta Node SDK was meant to be used on server side javascript, and altough it only uses WebAPIs (fetch) it shouldn't be used on browsers as it requires a Private API Key.

This is a very tiny (about 12kb minified), 0 dependencies JS SDK for interacting with Arta backend that should be able to run in any javascript backend environment that supports fetch webapi.

## Contributing

Please be aware of our zero-dependency policy and ensure that there are no packages under "dependencies" in the `package.json`. Dev dependencies are fine, as these will not be contained in the final published package.

### Development
To develop a new function on the SDK, run `npm install` to install all the dependencies (only dev dependencies) and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.