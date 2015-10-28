var util = require("./util");

exports['test express#get'] = function() {
  util.assertCompletion("var express = require('express');var app = express();app.g", {
    "start": {
      "line": 0,
      "ch": 57
     },
     "end": {
      "line": 0,
      "ch": 58
     },
     "isProperty": true,
     "isObjectKey": false,
     "completions": [
      {
       "name": "get",
       "type": "fn(path: string, callback: fn(req: request.Request, res: response.Response))",
       "doc": "The app.VERB() methods provide the routing functionality in Express, where VERB is one of the HTTP verbs (such as app.get()). ",
       "url": "http://expressjs.com/4x/api.html#app.VERB",
       "origin": "node-express"
      }
     ]
  });
}

exports['test express#get(req, res#send)'] = function() {
  util.assertCompletion("var express = require('express');var app = express();app.get('/', function(req, res){res.send",
    {
      "start": {
       "line": 0,
       "ch": 89
      },
      "end": {
       "line": 0,
       "ch": 93
      },
      "isProperty": true,
      "isObjectKey": false,      
      "completions": [
       {
        "name": "send",
        "type": "fn(body?: ?)",
        "doc": "Send a response.",
        "url": "http://expressjs.com/4x/api.html#res.send",
        "origin": "node-express"
       },
       {
        "name": "sendDate",
        "type": "bool",
        "doc": "When true, the Date header will be automatically generated and sent in the response if it is not already present in the headers. Defaults to true.",
        "url": "https://nodejs.org/api/http.html#http_response_senddate",
        "origin": "node"
       },
       {
        "name": "sendFile",
        "type": "fn(path: string, options?: Object, callback?: fn(err: Error))",
        "doc": "Transfer the file at the given path. The Content-Type response header field is automatically set based on the filename's extension. Unless the root option is set in the options object, path must be an absolute path of the file. Note: res.sendFile requires Express version to be at least 4.8.0",
        "url": "http://expressjs.com/4x/api.html#res.sendFile",
        "origin": "node-express"
       },
       {
        "name": "sendStatus",
        "type": "fn(statusCode?: number)",
        "doc": "Set the response HTTP status code to statusCode and send its string representation as the response body.",
        "url": "http://expressjs.com/4x/api.html#res.sendStatus",
        "origin": "node-express"
       }
     ]
  });
}