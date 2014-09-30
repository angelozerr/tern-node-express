(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  infer.registerFunction("expressRouterUse", function(_self, _args, argNodes) {
    // router.use can have 2 signatures : 
    // - router.use(string, fn(req, resp, next))
    // - router.use(fn(req, resp, next))    
    // tern can support only one signature with JSON Type Definition. In your case
    // we support the first signature (see Router.prototype.use)    
    if (argNodes && argNodes.length && argNodes[0].type == "FunctionExpression") {
      // here we support the second signature.
      var fn = _args[0], params = argNodes[0].params, cx = infer.cx(), paths = cx.paths;
      var fnArgs = [];
      for (var i = 0; i < params.length; i++) {
        switch(i) {
        case 0: // Request
          fnArgs.push(new infer.Obj(paths["Request.prototype"]));
          break;
        case 1: // Response
          fnArgs.push(new infer.Obj(paths["Response.prototype"]));
          break;
        case 2: // next
          fnArgs.push(new infer.Fn(null, infer.ANull, [], [], infer.ANull));
          break;
        }
      }
      fn.propagate(new infer.IsCallee(infer.cx().topScope, fnArgs, null, infer.ANull))
    }
  });
  
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
            "!effects": ["custom expressRouterUse"],
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
