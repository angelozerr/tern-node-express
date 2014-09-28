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
          "!type": "fn() -> application",
          "!doc": "Create an express application."
        }
      },
      application: {
        get: {
          "!type": "fn(name: string) -> ?", 
          "!doc": "Get setting name value."
        },
        set: {
          "!type": "fn(name: string, value: ?) -> !this", 
          "!doc": "Assigns setting name to value."
        }
      }
    }
  }
});
