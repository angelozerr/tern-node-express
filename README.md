# tern-node-express

[![Build Status](https://secure.travis-ci.org/angelozerr/tern-node-express.png)](http://travis-ci.org/angelozerr/tern-node-express)
[![NPM version](https://img.shields.io/npm/v/tern-node-express.svg)](https://www.npmjs.org/package/tern-node-express)

[tern-node-express](https://github.com/angelozerr/tern-node-express) is a plugin which adds support for [express web application framework for node](http://expressjs.com/) to the JavaSript code intelligence system [Tern](http://ternjs.net/).

## Demo

You can see demo with CodeMirror (inside Web Browser) [demos/express.html](https://github.com/angelozerr/tern-node-express/blob/master/demos/express.html) :

Here a screenshot with completion for expression object :
 
![CodeMirror & TernExpress](https://github.com/angelozerr/tern-node-express/wiki/images/TernExpressWithCodeMirror.png)

Here a screenshot with completion for Response instance:

![CodeMirror & TernExpress Response](https://github.com/angelozerr/tern-node-express/wiki/images/TernExpressResponseWithCodeMirror.png)

If you wish to use Eclipse as IDE, see Eclipse support for [Node Express](https://github.com/angelozerr/tern.java/wiki/Tern-&-Node-Express-support).

## Installation

tern-node-express works with the NodeJS [Tern Server][tern-server], and within a browser.

The easiest way to install tern-node-express is to use a recent version of
[npm][npm]. In the directory where you installed the [tern package][tern-npm],
simply run

```
$ npm install tern-node-express
```

## Configuration

`express` tern plugin extends `node` tern plugin to support express.

### With Node.js

In order for Tern to load the tern-node-express plugin once it is installed, you must
include `node-express` in the `plugins` section of your [Tern configuration
file][tern-config] and `node`.

Here is a minimal example `.tern-project` configuration file:

```json
{
  "ecmaVersion": 5,
  "plugins": {
    "node": {},
    "node-express": {}
  }
}
```

### With WebBrowser (CodeMirror)

See [demos/express.html](https://github.com/angelozerr/tern-node-express/blob/master/demos/express.html)

## Structure

The basic structure of the project is given in the following way:

* `node-express.js` the tern plugin.
* `demos/` demos with express tern plugin which use CodeMirror.
