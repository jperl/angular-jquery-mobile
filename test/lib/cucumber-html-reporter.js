(function () {
    "use strict";

    //from example, uses cucumber-html (which is bundled in cucumber.js)
    var cucumberHTMLListener = function ($root) {
        var CucumberHTML = window.CucumberHTML;
        var formatter = new CucumberHTML.DOMFormatter($root);

        formatter.uri('report.feature');

        var currentStep;

        var self = {
            hear: function hear(event, callback) {
                var eventName = event.getName();
                switch (eventName) {
                    case 'BeforeFeature':
                        var feature = event.getPayloadItem('feature');
                        formatter.feature({
                            keyword: feature.getKeyword(),
                            name: feature.getName(),
                            line: feature.getLine(),
                            description: feature.getDescription()
                        });
                        break;

                    case 'BeforeScenario':
                        var scenario = event.getPayloadItem('scenario');
                        formatter.scenario({
                            keyword: scenario.getKeyword(),
                            name: scenario.getName(),
                            line: scenario.getLine(),
                            description: scenario.getDescription()
                        });
                        break;

                    case 'BeforeStep':
                        var step = event.getPayloadItem('step');
                        self.handleAnyStep(step);
                        break;

                    case 'StepResult':
                        var result;
                        var stepResult = event.getPayloadItem('stepResult');
                        if (stepResult.isSuccessful()) {
                            result = {status: 'passed'};
                        } else if (stepResult.isPending()) {
                            result = {status: 'pending'};
                        } else if (stepResult.isUndefined() || stepResult.isSkipped()) {
                            result = {status: 'skipped'};
                        } else {
                            var error = stepResult.getFailureException();
                            var errorMessage = error.stack || error;
                            result = {status: 'failed', error_message: errorMessage};
                        }
                        formatter.match({uri: 'report.feature', step: {line: currentStep.getLine()}});
                        formatter.result(result);
                        break;
                }
                callback();
            },

            handleAnyStep: function handleAnyStep(step) {
                formatter.step({
                    keyword: step.getKeyword(),
                    name: step.getName(),
                    line: step.getLine(),
                });
                currentStep = step;
            }
        };
        return self;
    };

    /**
     * The default reporter
     * @constructor
     */
    Cucumber.HtmlReporter = function () {
        var output = $("<div id='output' class='cucumber-report'></div>"),
            runButton = $("<button id='run'>Run</button>");

        runButton.click(function () {
            Cucumber.run();
        });

        //add run button and the output elements
        $(document).ready(function () {
            var body = $("body");
            runButton.appendTo(body);
            output.appendTo(body);
        });

        return cucumberHTMLListener(output);
    };
}());