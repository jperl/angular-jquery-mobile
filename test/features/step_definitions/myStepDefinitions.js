"use strict";

addStepDefinitions(function (step) {
    step.Given("user opens the list", function (callback) {
        callback();
//        callback.pending();
        //this.visit("http://localhost:9000/app/index.html", callback);
    });

    step.When("user adds $todo to the list", function (todo, callback) {
        callback();

        console.log(todo);
//        callback.pending();
    });

    step.When("user completes $todo", function (todo, callback) {
        callback();

        console.log(todo);
//        callback.pending();
    });

    step.When("user saves the list", function (callback) {
        callback();

//        callback.pending();
    });

    step.Then("user should see $todo in the list", function (todo, callback) {
        callback();

        console.log(todo);
//        callback.pending();
    });

    step.Then("user should not see $todo in the list", function (todo, callback) {
        console.log(todo);

        callback();
//        callback.pending();
    });
});