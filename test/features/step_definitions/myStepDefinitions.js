"use strict";

addStepDefinitions(function (step) {
    var uit, findTodo = function ($, text) {
        return $("[todo]").find("span:contains('" + text + "')");
    };

    step.Given("user opens the list", function (callback) {
        //create a new test every time
        uit = uitest.create();
        uit.feature("angularIntegration");

        uit.url("../../app/index.html");

        uit.ready(function () {
            callback();
        });
    });

    step.When("user adds $todoText to the list", function (todoText, callback) {
        uit.ready(function (document, angular) {
            var input = angular.element("#todoInput");
            input.val(todoText);
            input.change();
            angular.element("#addTodo").click();
            callback();
        });
    });

    step.When("user completes $todoText", function (todoText, callback) {
        uit.ready(function (document, $, angular) {
            var todoElement = findTodo($, todoText);
            todoElement = angular.element(todoElement);
            var scope = todoElement.scope();
            scope.todo.completed = true;
            scope.$digest();
            callback();
        });
    });

    step.When("user saves the list", function (callback) {
        uit.ready(function (document, angular) {
            angular.element("#save").click();
            callback();
        });
    });

    step.Then("user should see $todoText in the list", function (todoText, callback) {
        uit.ready(function (document, $) {
            var todo = findTodo($, todoText);
            if (todo.length === 0) {
                callback.fail();
            }
            else {
                callback();
            }
        });
    });

    step.Then("user should not see $todoText in the list", function (todoText, callback) {
        uit.ready(function (document, $) {
            var todo = findTodo($, todoText);
            if (todo.length === 0) {
                callback();
            }
            else {
                callback.fail();
            }
        });
    });
});