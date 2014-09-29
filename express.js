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
          "!url": "http://expressjs.com/4x/api.html#express",
          "!doc": "Create an express application.",
          Router: {
            "!type": "fn(options?: +RouterOptions) -> +Router"
          }
        }
      },
      Application: {
        get: {
          "!type": "fn(name: string, callback?: fn(req: +Request, req: +Response))",
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
      },
      Router: {
        "!type": "fn()",
        prototype : {
          use: {
            "!type": "fn(path?: string, callback: fn(req: +Request, req: +Response, next: fn())) -> !this",
            "!url": "http://expressjs.com/4x/api.html#router.use",
            "!doc" : "Use the given middleware function, with optional mount path, defaulting to "/". Middleware is like a plumbing pipe, requests start at the first middleware you define and work their way \"down\" the middleware stack processing for each path they match."
          },
          param: {
            "!type": "fn(name?: string, callback: fn(req: +Request, req: +Response, next: fn(), id: ?)) -> !this",
            "!url": "http://expressjs.com/4x/api.html#router.param",
            "!doc" : "Map logic to route parameters. For example, when :user is present in a route path you may map user loading logic to automatically provide req.user to the route, or perform validations on the parameter input."
          }
        }
      },
      RouterOptions: {
        caseSensitive : {
          "!type": "bool"
        },
        strict : {
          "!type": "string"
        },
        mergeParams : {
          "!type": "bool"
        }
      }
    }
  }
});
