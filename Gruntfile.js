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
                    "{.tmp,app}/*.html",
                    "{.tmp,app}/*/*.html",
                    "{.tmp,app}/scripts/**/*.js",
                    "{.tmp,app}/styles/**/*.css",
                    "{.tmp,app}/styles/**/*.less",
                    "{.tmp,app}/styles/images/*.{png,jpg,jpeg}"
                ],
                tasks: ["less", "html2js:templates", "preprocess:dev", "jshint", "livereload"]
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
                jshintrc: ".jshintrc"
            },
            all: [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/**/*.js",
                "!test/lib/*.js"
            ]
        },
        testacular: {
            options: {
                basePath: "",

                // web server port
                port: 9876,

                reporter: "progress",

                // enable colors in the output (reporters and logs)
                colors: true,

                // disable watching file and executing tests whenever any file changes
                autoWatch: false
            },
            unit: {
                options: {
                    configFile: "testacularUnit.conf.js",
                    runnerPort: 9101
                }
            },
            unitCi: {
                options: {
                    configFile: "testacularUnit.conf.js",
                    runnerPort: 9101,
                    keepalive: true,
                    singleRun: true,
                    browsers: ["PhantomJS"]
                }
            }
        },
        testacularRun: {
            unit: {
                options: {
                    runnerPort: 9101
                }
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
                        ".tmp/scripts/*.js",
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
        cssmin: {
            dist: {
                files: {
                    "dist/styles/main.css": [
                        ".tmp/styles/*.css",
                        "app/styles/*.css"
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

    grunt.renameTask("regarde", "watch");
    // remove when mincss task is renamed
    grunt.renameTask("mincss", "cssmin");

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
        var tasks = [
            "clean:server",
            "preprocess:dev",
            "less",
            "html2js:templates",
            "jshint",
            "livereload-start",
            "connect:dev",
            "open:dev"
        ];

        if (target === "dist") {
            return grunt.task.run(["open:dist", "connect:dist:keepalive"]);
        } else if (target === "test") {
            //start testacular servers
            tasks = tasks.concat(["testacular:unit"]);
        }

        tasks.push("watch:server");

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
        "testacular:unitCi"
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
        "cssmin",
        "htmlmin",
        "concat",
        //"uglify",
        "copy",
        "cdnify",
        "usemin"
    ]);

    grunt.registerTask("default", ["build"]);
};