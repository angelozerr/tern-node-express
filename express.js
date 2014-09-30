(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("tern/lib/infer"), require("tern/lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define([ "tern/lib/infer", "tern/lib/tern" ], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  infer.registerFunction("expressUse", function(_self, _args, argNodes) {
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
        },
        enable: {
          "!type": "fn(name: string) -> !this",
          "!url": "http://expressjs.com/4x/api.html#app.enable",
          "!doc": "Set setting name to true."
        },
        enabled: {
          "!type": "fn(name: string) -> bool",
          "!url": "http://expressjs.com/4x/api.html#app.enabled",
          "!doc": "Check if setting name is enabled."
        },
        disable: {
          "!type": "fn(name: string) -> !this",
          "!url": "http://expressjs.com/4x/api.html#app.disable",
          "!doc": "Set setting name to false."
        },
        disabled: {
          "!type": "fn(name: string) -> bool",
          "!url": "http://expressjs.com/4x/api.html#app.disabled",
          "!doc": "Check if setting name is disabled."
        },
        use: {
          "!type": "fn(path?: string, callback: fn(req: +Request, req: +Response, next: fn())) -> !this",
          "!effects": ["custom expressUse"],
          "!url": "http://expressjs.com/4x/api.html#app.use",
          "!doc" : "Mount the middleware function(s) at the path. If path is not specified, it defaults to \"/\". Mounting a middleware at a path will cause the middleware function to be executed whenever the base of the requested path matches the path."
        },
        engine: {
          "!type": "fn(ext: string, callback: fn()) -> !this",
          "!url": "http://expressjs.com/4x/api.html#app.engine",
          "!doc": "Register the given template engine callback as ext. By default, Express will require() the engine based on the file extension. For example if you try to render a \"foo.jade\" file Express will invoke the following internally, and cache the require() on subsequent calls to increase performance."
        },
        param: {
          "!type": "fn(name?: string, callback: fn(req: +Request, req: +Response, next: fn())) -> !this",
          "!effects": ["custom expressUse"],
          "!url": "http://expressjs.com/4x/api.html#app.param",
          "!doc" : "Map logic to route parameters. For example, when :user is present in a route path, you may map user loading logic to automatically provide req.user to the route, or perform validations on the parameter input."
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
            "!effects": ["custom expressUse"],
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
