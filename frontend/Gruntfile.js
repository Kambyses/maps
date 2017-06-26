"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    "pkg":   grunt.file.readJSON("package.json"),

    "project": {},

    "jshint": {
      "files": [ "Gruntfile.js", "src/app/**/*.js", "src/app/**/*.json" ],
      "options": {
        "jshintrc": ".jshintrc",
        "ignores":  [ ]
      }
    },

    "clean": {
      "files": [ "dist", ".sass-cache", "src/app/scss/.sass-cache" ]
    },

    "replace": {
      "dist": {
        "src":       ["dist/index.html", "dist/app/js/init.js"],
        "overwrite": true,
        "replacements": [
          {
            "from": '"app/js/init.js"',
            "to":   '"app/js/init.js?_v=' + new Date().toISOString().replace("T", "-").replace(/:/g, "-").substr(0, 19) + '"'
          },
          {
            "from": 'urlArgs:null',
            "to":   'urlArgs:"_v=' + new Date().toISOString().replace("T", "-").replace(/:/g, "-").substr(0, 19) + '"'
          }
        ]
      }
    },

    "watch": {
      "tasks": [ "jshint" ],
      "files": [
        "Gruntfile.js",
        "src/app/**/*.js",
        "src/app/**/*.json",
        "src/app/**/*.css",
        "src/app/**/*.scss",
        "src/app/**/*.html"
      ]
    },

    "requirejs": {
      "app": {
        "options": {
          "baseUrl":                 "src",
          "dir":                     "dist",
          "optimize":                "uglify2",
          "fileExclusionRegExp":     /^(vendors|scss)/,
          "optimizeCss":             "standard",
          "preserveLicenseComments": true,
          "removeCombined":          true,
          "generateSourceMaps":      false,
          "findNestedDependencies":  false,
          "uglify": {
            "options": {}
          }
        }
      },
      "appmin": {
        "options": {
          "baseUrl":                 "src/app/js",
          "mainConfigFile":          "src/app/js/init.js",
          "name":                    "init",
          "out":                     "dist/app/js/app.min.js",
          "optimize":                "none",
          "optimizeCss":             "none",
          "preserveLicenseComments": true,
          "generateSourceMaps":      false,
          "findNestedDependencies":  true,
          "skipDirOptimize":         true,
          "uglify": {
            "options": {}
          },
          "paths": {
          },
          "exclude": [
            "jquery",
            "webix",
            "i18next",
            "sss",
            "text",
            "json",
            "webixPlugins/sidebar.min"
          ],
          excludeShallow: [
            "jquery",
            "webix",
            "i18next",
            "sss",
            "text",
            "json"
          ]
        }
      },
      "vendors": {
        "options": {
          "baseUrl":                 "src/vendors/",
          "dir":                     "dist/vendors/",
          "optimize":                "none",
          "optimizeCss":             "none",
          "preserveLicenseComments": true,
          "removeCombined":          true,
          "generateSourceMaps":      false,
          "findNestedDependencies":  false,
          "uglify": {
            "options": {}
          }
        }
      }
    },

    "jsonmin": {
      "build": {
        "files": {
          "dist/app/js/i18n/et.json": "src/app/js/i18n/et.json",
          "dist/app/js/i18n/en.json": "src/app/js/i18n/en.json"
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks('grunt-jsonmin');
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-keepalive");

  grunt.registerTask("build", [ "jshint", "clean", "requirejs:app",  "requirejs:vendors", "jsonmin", "replace" ]);


  grunt.registerTask("serve", function (moduleName) {
    grunt.task.run([(moduleName !== undefined) ? "proxyRestServer:" + moduleName : "proxyRestServer", "serveLocalHost", "watch", "keepalive"]);
  });

  grunt.registerTask("serveLocalHost", "", function () {
    var open, port;
    if (grunt.option("open-browser")) {
      open = require("open");
      port = (grunt.option("server-port") === undefined) ? 9090 : grunt.option("server-port");
      open("http://127.0.0.1:" + port);
    }
  });


  grunt.registerTask("proxyRestServer", 'Start a custom web server.', function (moduleName) {
    var apiUrl, apiPort, serverPort, express, app, path, http, devRest, url, cors, uri, filePath, workingDir; /* , cwd, serverCfg*/
    express = require("express");
    path    = require("path");
    url     = require("url");
    app     = express();
    http    = require("http");
    cors    = require("cors");
    devRest = require("dev-rest-proxy");
    apiUrl  = grunt.option("api") === undefined ? "127.0.0.1" : grunt.option("api");
    apiPort = grunt.option("api-port") === undefined ? 80 : grunt.option("api-port");
    serverPort = (grunt.option('server-port') === undefined) ? 9090 : grunt.option('server-port');

    if (apiUrl === undefined) {
      grunt.fail.error("Api parameter has not been defined. ( i.e. --api=127.0.0.1 )");
      return false;
    }
    if (moduleName !== undefined) {
      workingDir = path.resolve(path.join("modules", moduleName));
      if (!grunt.file.exists(workingDir) && !grunt.file.isDir(workingDir)) {
        grunt.log.error("Module with name \"" + moduleName + "\" not found.");
        return false;
      }
    }

    app.use(cors());

    app.use(function (req, res, next) {
      grunt.log.writeln(Date.now() + " " + req.method + " " + req.url);
      grunt.log.writeln(res);
      next();
    });

    if (moduleName === undefined) {
      app.use(express["static"]("src"));
      app.get(["/bower_components/*", "/libs/*", "/modules/*", "/locales/*"], function (req, res) {
        uri = url.parse(req.url).pathname;
        filePath = path.join(path.resolve("./"), uri);// jshint ignore:line
        res.sendFile(filePath);
      });
    } else {
      app.use(express["static"](path.join("modules", moduleName, "dist")));
    }
    app.get("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.put("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.post("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app.post("/oauth/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    app["delete"]("/api/*", function (req, res) {
      devRest.proxy(req, res, apiUrl, apiPort);
    });
    http.createServer(app).listen(serverPort, function () {
      grunt.log.writeln("Server started at http://localhost:" + serverPort);
    });
  });

};
