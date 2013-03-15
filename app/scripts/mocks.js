(function (undefined) {
    "use strict";

    var app = angular.module("app");

    // use $httpBackend mock
    app.config(function ($provide) {
        $provide.decorator("$httpBackend", angular.mock.e2e.$httpBackendDecorator);
    });

    var todos = [
        { name: "First", completed: true },
        { name: "Second", completed: false },
        { name: "Third", completed: false }
    ];

    // define our fake backend
    app.run(function ($httpBackend) {
        $httpBackend.whenJSONP("https://secure.openkeyval.org/JQueryMobileAngularTodoapp?callback=JSON_CALLBACK").respond(todos);
        $httpBackend.whenJSONP(/https:\/\/secure.openkeyval.org\/store/).respond();
    });
})();