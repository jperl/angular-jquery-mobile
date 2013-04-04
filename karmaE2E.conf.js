// Karma configuration

basePath = ".";

frameworks = ['cucumber'];

files = [
    //libraries
    "app/components/uitest.js/dist/uitest.js",

    //Test-Specs
    "test/features/run.js",
    "test/features/step_definitions/myStepDefinitions.js",
    {pattern: 'test/features/**/*.feature', watched: false, included: false},

    //serve the application
    {pattern: 'app/**', watched: false, included: false}
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

plugins = [
    "karma-cucumber"
];