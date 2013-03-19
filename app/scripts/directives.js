"use strict";

angular.module("app")
    .directive("todo", function () {
        return {
            replace: true,
            templateUrl: "app/templates/todo.html"
        };
    });