// Testacular configuration

// list of all files / patterns to load in the browser

files = [
    JASMINE,
    JASMINE_ADAPTER,

    //3rd Party Code
    "app/vendor/jquery-mobile-angular-adapter-standalone.js",
    "app/components/angular-resource/angular-resource.js",

    //App-specific Code
    "app/scripts/app.js",
    "app/scripts/**/**.js",
    "app/templates/**/*.html.js",

    //Test-Specific Code
    "app/vendor/angular-mocks.js",
    "app/scripts/mocks.js",
    "test/lib/unittestUtils.js",

    //Test-Specs
    "test/unit/**/*Spec.js"
];

// list of files to exclude
exclude = [];

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
process.env["PHANTOMJS_BIN"] = "node_modules/.bin/phantomjs";
browsers = ["Chrome"];