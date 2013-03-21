/**
 * Wrapper around cucumber-js to create a standard runner & reporter for client side testing
 * Initially the runner has the following reporters available: cucumber-reporter (using cucumber-html)
 * and karma-cucumber for use with karma (http://karma-runner.github.com/)
 */
(function () {
    "use strict";

    var my = {}, listeners = [], features = [], stepDefinitions = [],
        featuresToLoad = 0;

    //if the user calls run before sources are loaded, Cucumber.run will set this up
    var attemptRun = function () {
    };

    /**
     * Load the .feature definitions to test
     * @param {Array.<String>} urls
     */
    window.loadFeatures = function (urls) {
        featuresToLoad += urls.length;

        async.each(urls, function (url, callback) {
            $.get(url, function (data) {
                features.push(data);
                featuresToLoad -= 1;
                console.log("feature loaded");
                callback();
            });

        }, function (err) {
            attemptRun();
        });
    };

    /**
     * Add step definition functions for the features
     * @param {Function} func
     */
    window.addStepDefinitions = function (func) {
        stepDefinitions.push(func);
    };

    /**
     * Attach a listener to the cucumber test runner
     * @param listener
     */
    Cucumber.attachListener = function (listener) {
        listeners.push(listener);
    };

    /**
     * Run the cucumber feature tests
     */
    Cucumber.run = function () {
        //wait to run until all features are loaded
        if (featuresToLoad > 0) {
            //setup the attemptRun callback
            attemptRun = Cucumber.run;
            return;
        }

        var featuresSource = features.join();

        var stepDefinitionsSource = function () {
            var that = this;
            stepDefinitions.forEach(function (func) {
                func(that);
            });
        };

        var cucumber = Cucumber(featuresSource, stepDefinitionsSource);

        listeners.forEach(function (listener) {
            cucumber.attachListener(listener);
        });

        cucumber.start(function () {
            console.log("Complete");
        });
    };

    return my;
})();