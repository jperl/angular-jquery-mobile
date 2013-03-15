"use strict";

//based off https://github.com/vojtajina/ng-directive-testing/blob/master/test/tabsSpec.js
describe("todo", function () {
    var element, scope;

    beforeEach(module("app"));

    beforeEach(inject(function ($rootScope, $compile) {
        element = angular.element("<div><div todo></div></div>");

        scope = $rootScope;
        $compile(element)(scope);

        scope.todo = { name: "First", completed: true };
        scope.$digest();
    }));

    it("should display the task name", function () {
        var label = element.find("label");

        expect(label.text()).toContain("First");
    });

    it("should be checked if the task is complete", function () {
        var checkItems = element.find(".ui-icon-checkbox-on");

        expect(checkItems.length).toBe(1);
    });
});