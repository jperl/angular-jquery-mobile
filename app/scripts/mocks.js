"use strict";

// use $httpBackend mock
angular.module("app")
    .config(function ($provide) {
        $provide.decorator("$httpBackend", angular.mock.e2e.$httpBackendDecorator);
    })
    // define our fake backend
    .run(function ($httpBackend) {
        var todos = [
            { name: "First", completed: true },
            { name: "Second", completed: false },
            { name: "Third", completed: false }
        ];

        $httpBackend.whenJSONP("https://secure.openkeyval.org/JQueryMobileAngularTodoapp?callback=JSON_CALLBACK").respond(todos);
        $httpBackend.whenJSONP(/https:\/\/secure.openkeyval.org\/store/).respond();
    });