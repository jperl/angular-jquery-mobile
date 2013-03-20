"use strict";

//based off https://github.com/vojtajina/ng-directive-testing/blob/master/test/tabsSpec.js
//and https://github.com/tigbro/jquery-mobile-angular-adapter/blob/master/test/unit/integration/checkBoxSpec.js
describe("todo", function () {
    beforeEach(module("app"));

    it("should display the task name", function () {
        var c = testutils.compileInPage("<div todo></div>");

        var scope = c.page.scope();
        scope.todo = { name: "First" };
        scope.$root.$digest();

        var label = c.element.find("label");

        expect(label.text()).toContain("First");
    });

    it("should be checked if the task is complete", function () {
        var c = testutils.compileInPage("<div todo></div>");

        var scope = c.page.scope();
        scope.todo = { name: "First", completed: true };
        scope.$root.$digest();

        var checkItems = c.element.find(".ui-icon-checkbox-on");

        expect(checkItems.length).toBe(1);
    });
});