// Karma configuration

frameworks = ["jasmine"];

files = [
    //remove in karma 9.0
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

exclude = [];

logLevel = LOG_INFO;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ["Chrome"];