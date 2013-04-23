"use strict";

var util = require("util");

var lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet;

module.exports = function (grunt) {
    // load all grunt tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        cdnify: {
            dist: {
                html: ["dist/*.html"]
            }
        },
        clean: {
            dist: ["dist/*"]
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
                    hostname: "0.0.0.0",
                    middleware: function (connect, options) {
                        return [
                            connect.static(options.base),
                            connect.directory(options.base)
                        ];
                    }
                }
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
        },
        cssmin: {
            dist: {
                files: {
                    "dist/styles/main.css": [
                        "app/styles/*.css"
                    ]
                }
            }
        },
        html2js: {
            templates: ["app/templates/**/*.html"]
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
                browsers: ["Firefox"]  //PhantomJS will work in next karma release
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
            },
            e2eCi: {
                configFile: "karmaE2E.conf.js",
                singleRun: true
            }
        },
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
        uglify: {
            dist: {
                files: {
                    "dist/scripts/libraries.min.js": ["dist/scripts/libraries.min.js"],
                    "dist/scripts/main.min.js": ["dist/scripts/main.min.js"]
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
        watch: {
            server: {
                files: [
                    "app/indexTemplate.html",
                    "app/templates/**/*.html",
                    "app/pages/**/*.html",
                    "app/scripts/**/*.js",
                    "app/styles/**/*.less",
                    "app/styles/images/*.{png,jpg,jpeg}"
                ],
                tasks: ["less", "html2js:templates", "preprocess:dev", "jshint", "livereload"]
            }
        }
    });

    grunt.renameTask("regarde", "watch");

    // template compilation
    var TEMPLATE = "angular.module('%s').run(['$templateCache', function($templateCache) {\n" +
        "  $templateCache.put('%s',\n    '%s');\n" +
        "}]);\n";

    var escapeContent = function (content) {
        return content.replace(/'/g, "\\'").replace(/\r?\n/g, "\\n' +\n    '");
    };

    grunt.registerTask("install", "install the frontend dependencies and karma-cucumber", function () {
        var exec = require("child_process").exec;
        var cb = this.async();
        exec("bower install --dev", {}, function (err, stdout) {
            console.log(stdout);
            cb();
        });
    });

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
            "preprocess:dev",
            "less",
            "html2js:templates",
            "jshint",
            "connect:dev"
        ];

        if (target !== "noreload") {
            tasks.push("livereload-start");
        }

        if (target === "dist") {
            return grunt.task.run(["connect:dist:keepalive"]);
        } else if (target === "testUnit") {
            tasks.push("karma:unit");
        } else if (target === "testE2E") {
            tasks.push("karma:e2e");
        } else {
            tasks.push("watch:server");
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask("ci", function (target) {
        var tasks = [
            "preprocess:dev",
            "less",
            "html2js:templates",
            "jshint",
            "connect:dev"
        ];

        if (!target) {
            tasks.push("karma:unitCi");
//            Does not work yet, waiting on next Karma version
//            tasks.push("karma:e2eCi");
        } else if (target === "unit") {
            tasks.push("karma:unitCi");
        } else if (target === "e2e") {
            tasks.push("karma:e2eCi");
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask("build", [
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
        "copy",
        "cdnify",
        "uglify:dist",
        "usemin"
    ]);

    grunt.registerTask("default", ["build"]);
};