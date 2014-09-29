(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  tern.registerPlugin("express", function(server, options) {

    return {
      defs: defs
    };
  });

  var defs = {
    "!name": "express",
    "!define": {
      "!node": {
        express: {
          "!type": "fn() -> Application",
          "!doc": "Create an express application."
        }
      },
      Application: {
        get: {
          "!type": "fn(name: string, function?: fn(req: +Request, req: +Response))",
          "!url": "http://expressjs.com/4x/api.html#app.get",
          "!doc": "Get setting name value."
        },
        set: {
          "!type": "fn(name: string, value: ?) -> !this",
          "!url": "http://expressjs.com/4x/api.html#app.set",
          "!doc": "Assigns setting name to value."
        }
      },
      Request: {
        "!type": "fn()",
        prototype : {
          "!proto" : "http.IncomingMessage.prototype",
          param: {
            "!type": "fn(name: string, defaultValue?: ?)",
            "!url": "http://expressjs.com/4x/api.html#req.param",
            "!doc": "Return the value of param name when present."
          }
        }
      },
      Response: {
        "!type": "fn()",
        prototype : {
          "!proto" : "http.ServerResponse.prototype",
          send: {
            "!type": "fn(body?: ?)",
            "!url": "http://expressjs.com/4x/api.html#res.send",
            "!doc": "Send a response."
          }
        }
      }
    }
  }
});
