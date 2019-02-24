# APEX 



A simple, easy to use module for interacting with the [API.](https://apex.tracker.gg/site-api)

## Setup and Installation
```
$ npm i apex-api
```

1. Signup at [ApexTracker](https://apex.tracker.gg/)
2. Generate an [API Key](https://apex.tracker.gg/site-api)

## Getting Started
```js
// Bring in the Apex module
const Apex = require('apex-api');
// Create an instance of the client with your API Key
const apex = new Apex('YourAPIkey');

apex.user('username', 'platform [PC | XBOX | PSN]').then(console.log);

```
