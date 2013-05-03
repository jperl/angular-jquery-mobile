// Karma configuration

frameworks = ["jasmine"];

files = [
    //remove in karma 9.0
    JASMINE,
    JASMINE_ADAPTER,

    //3rd Party Code
    "app/components/jquery/jquery.js",
    "app/components/jquery-mobile-angular-adapter/lib/jquery.mobile.js",
    "app/components/angular/angular.js",
    "app/components/jquery-mobile-angular-adapter/compiled/jquery-mobile-angular-adapter.js",

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