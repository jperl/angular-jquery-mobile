"use strict";

var util = require("util");

var lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require("path").resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        less: {
            all: {
                options: {
                    compile: true
                },
                files: {
                    "app/styles/main.css": "app/styles/main.less"
                }
            }
        },
        html2js: {
            templates: ["app/templates/**/*.html"]
        },
        watch: {
            server: {
                files: [
                    "app/indexTemplate.html",
                    "app/templates/**/*.html",
                    "app/views/**/*.html",
                    "app/scripts/**/*.js",
                    "app/styles/**/*.less",
                    "app/styles/images/*.{png,jpg,jpeg}"
                ],
                tasks: ["less", "html2js:templates", "preprocess:dev", "jshint"] //"livereload"
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    middleware: function (connect, options) {
                        return [
                            lrSnippet,
                            connect.static(options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    port: 9000,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, "dist")
                        ];
                    }
                }
            }
        },
        open: {
            dist: {
                url: "http://localhost:<%= connect.dev.options.port %>"
            },
            dev: {
                url: "http://localhost:<%= connect.dist.options.port %>:/app/index.html"
            }
        },
        clean: {
            dist: [".tmp", "dist/*"],
            server: ".tmp"
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                force: true
            },
            all: [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/**/*.js",
                "!test/lib/*.js"
            ]
        },
        karma: {
            options: {
                browsers: ["Chrome"]  //PhantomJS will work in next karma release
            },
            unit: {
                configFile: "karmaUnit.conf.js"
            },
            unitCi: {
                configFile: "karmaUnit.conf.js",
                singleRun: true
            },
            e2e: {
                configFile: "karmaE2E.conf.js"
            }
        },
        preprocess: {
            dev: {
                options: {
                    context: {
                        DEV: true
                    }
                },
                src: "app/indexTemplate.html",
                dest: "app/index.html"
            },
            dist: {
                src: "app/indexTemplate.html",
                dest: "app/index.html"
            }
        },
        concat: {
            dist: {
                files: {
                    "dist/scripts/main.js": [
                        "app/scripts/*.js"
                    ]
                }
            }
        },
        useminPrepare: {
            html: "app/index.html",
            options: {
                dest: "dist"
            }
        },
        usemin: {
            html: ["dist/*.html"],
            css: ["dist/styles/*.css"],
            options: {
                dirs: ["dist"]
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "app/styles/images",
                        src: "*.{png,jpg,jpeg}",
                        dest: "dist/styles/images"
                    }
                ]
            }
        },
        mincss: {
            dist: {
                files: {
                    "dist/styles/main.css": [
                        "{.tmp,app}/styles/*.css"
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: "app",
                        src: "*.html",
                        dest: "dist"
                    }
                ]
            }
        },
        cdnify: {
            dist: {
                html: ["dist/*.html"]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: "app",
                        dest: "dist",
                        src: [
                            "*.{ico,txt}",
                            ".htaccess",
                            "styles/fonts/**",
                            "styles/images/**"
                        ]
                    }
                ]
            }
        }
    });

    // template compilation
    var TEMPLATE = "angular.module('%s').run(function($templateCache) {\n" +
        "  $templateCache.put('%s',\n    '%s');\n" +
        "});\n";

    var escapeContent = function (content) {
        return content.replace(/'/g, "\\'").replace(/\r?\n/g, "\\n' +\n    '");
    };

    grunt.registerMultiTask("html2js", "Generate js version of html template.", function () {
        /* jshint camelcase: false */
        var files = grunt._watch_changed_files || grunt.file.expand(this.data);

        console.log(files);

        files.forEach(function (file) {
            var content = escapeContent(grunt.file.read(file));
            var template = util.format(TEMPLATE, "app", file, content);

            var slashIndex = file.lastIndexOf("/");

            //put the file in app/templates/generated and append .js
            file = "app/templates/generated" + file.substr(slashIndex) + ".js";
            grunt.file.write(file, template);
        });
    });

    grunt.registerTask("server", function (target) {
        if (target === "dist") {
            return grunt.task.run(["open:dist", "connect:dist:keepalive"]);
        }

        var tasks = [
            "clean:server",
            "preprocess:dev",
            "less",
            "html2js:templates",
            "jshint",
            //waiting on issue #
            //"livereload-start",
            "connect:dev",
            "open:dev"
        ];

        if (target === "test") {
            //start karma servers
            tasks = tasks.concat(["karma:unit"]);
        } else {
            //start watch server
            tasks.push("watch");
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask("ci", [
        "clean:server",
        "preprocess:dev",
        "less",
        "html2js:templates",
        "jshint",
        "connect:dev",
        //run tests
        "karma:unitCi"
    ]);

    grunt.registerTask("build", [
        //run tests first
        //TODO make tests run on dist
        "ci",
        "clean:dist",
        "preprocess:dist",
        "less",
        "html2js:templates",
        "jshint",
        "useminPrepare",
        "imagemin",
        "mincss",
        "htmlmin",
        "concat",
        //"uglify",
        "copy",
        "cdnify",
        "usemin"
    ]);

    grunt.registerTask("default", ["build"]);
};