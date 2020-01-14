# cws

> Cross-platform interface for websockets

[![NPM](https://nodei.co/npm/cws.png)](https://nodei.co/npm/cws/)


## Install

```bash
npm install --save cws
```

## Usage

### Node.JS

For node usage, look at the [ws package][ws] as that's what's returned.

### Browser

[src/index.js](src/index.js) can either be loaded directly or you can require the module through
[browserify][browserify]. Creating a server is not supported in the browser. Arguments to the constructor are passed
directly to [WebSocket][websocket] & this module wraps around it to provide a node-style api.

[browserify]: https://npmjs.com/package/browserify
[ws]: https://npmjs.com/package/ws
[websocket]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
