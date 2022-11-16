Arta Node.js Library
===

The Arta Node library provides a seamless integration to Arta API for applications running on Node.js using both Typescript or Javascript.

## Documentation

Please refer to [Arta official documentation](https://api-reference.arta.io/).


## Getting Started

### 1. Install Arta Node Library

```
$ npm install arta-node
```

### 2. Use it to interact with our API in pure JS
```js
const { Arta } = require('arta-node');
const arta = new Arta('<YOUR_API_TOKEN>');

const endpoints = arta.endpoint.list();

const myEndpoint = endpoint[0];

myEndpoint.ping().then(console.log);
```

### 3. Use it to interact with our API in TS
```ts
import { Arta } from 'arta-node';
const arta: Arta = new Arta('<YOUR_API_TOKEN>');

const endpoints: ArtaEndpoint[] = arta.endpoint.list();

const myEndpoint: ArtaEndpoint = endpoint[0];

myEndpoint.ping().then(console.log);
```

## Contributing

Please be aware of our zero-dependency policy and ensure that there are no packages under "dependencies" in the `package.json`. Dev dependencies are fine, as these will not be contained in the final published package.

### Development
To develop a new function on the SDK, run `npm install` to install all the dependencies (only dev dependencies) and then run `npm run build` and the compiled JS code will be stored in the `dist/` folder which is the folder with the content published to NPM.