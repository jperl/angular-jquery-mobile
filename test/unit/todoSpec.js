"use strict";

//based off https://github.com/vojtajina/ng-directive-testing/blob/master/test/tabsSpec.js
//and https://github.com/tigbro/jquery-mobile-angular-adapter/blob/master/test/unit/integration/checkBoxSpec.js
describe("todo", function () {
    beforeEach(module("app"));

    var firstTest, secondTest;

    it("log the element", function () {
        var c = testutils.compileInPage("<div todo></div>");

        var scope = c.page.scope();
        scope.todo = { name: "First", completed: true };
        scope.$root.$digest();

        firstTest = c.element.html();
        console.log(firstTest);
    });

    it("should log the same html as the first test", function () {
        var c = testutils.compileInPage("<div todo></div>");

        var scope = c.page.scope();
        scope.todo = { name: "First", completed: true };
        scope.$root.$digest();

        secondTest = c.element.html();
        console.log(secondTest);

        expect(secondTest).toEqual(firstTest);
    });

//    it("should be checked if the task is complete", function () {
//        var c = testutils.compileInPage("<div todo></div>");
//
//        var label = c.element.find("label");

//        expect(label.text()).toContain("First");

//        var scope = c.page.scope();
//        scope.todo = { name: "First", completed: true };
//        scope.$root.$digest();
//
//        var checkItems = c.element.find(".ui-icon-checkbox-on");
//
//        expect(checkItems.length).toBe(1);
//    });
});