"use strict";

var fs = require("fs"), path = require("path"), tern = require("tern"), assert = require('assert');
require("tern/plugin/node");
require("../node-express.js");

var projectDir = path.resolve(__dirname, "..");
var resolve = function(pth) {
	return path.resolve(projectDir, pth);
};
var ecma5 = JSON.parse(fs
		.readFileSync(resolve("node_modules/tern/defs/ecma5.json")), "utf8");
       
var allDefs = {
  ecma5 : ecma5
};

var defaultQueryOptions = {
  types: true,
  docs: true,
  urls: true,
  origins: true
}

function createServer(defs, options) {
	var plugins = {'node': {}};
	if (options) plugins['node-express'] = options; else plugins['node-express'] = {};
	var server = new tern.Server({
		plugins : plugins,
		defs : defs
	});
	return server;
}

exports.assertCompletion = function(text, expected, queryOptions, pluginOptions) {
	var defs = [];
	var defNames = ["ecma5"]; 
	if (defNames) {
		for (var i = 0; i < defNames.length; i++) {
			var def = allDefs[defNames[i]];
			defs.push(def);
		}
	}
	if (!queryOptions) queryOptions = defaultQueryOptions;

	var server = createServer(defs, pluginOptions);
	server.addFile("test1.js", text);
	server.request({
		query : {
			type: "completions",
			file: "test1.js",
			end: text.length,
			types: queryOptions.types,
			docs: queryOptions.docs,
			urls: queryOptions.urls,
			origins: queryOptions.origins,
			caseInsensitive: true,
			lineCharPositions: true,
			expandWordForward: false,
			guess: false,
			docFormat: "full"
		}
	}, function(err, resp) {
		if (err)
			throw err;
		var actualMessages = resp.messages;
		var expectedMessages = expected.messages;
		assert.equal(JSON.stringify(resp), JSON.stringify(expected));
	});
}