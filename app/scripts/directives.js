(function () {
    "use strict";

    var app = angular.module("app");

    app.directive("todo", function () {
        return {
            replace: true,
            templateUrl: "app/templates/todo.html"
        };
    });
})();