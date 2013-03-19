"use strict";

var myStepDefinitionsWrapper = function () {
    this.World = require("../support/world.js").World; // overwrite default World constructor

    this.Given("user opens the list", function (callback) {
        callback.pending();
        //this.visit("http://localhost:9000/app/index.html", callback);
    });

    this.When("user adds $todo to the list", function (todo, callback) {
        console.log(todo);
        callback.pending();
    });

    this.When("user completes $todo", function (todo, callback) {
        console.log(todo);
        callback.pending();
    });

    this.When("user saves the list", function (todo, callback) {
        console.log(todo);
        callback.pending();
    });

    this.Then("user should see $todo in the list", function (todo, callback) {
        console.log(todo);
        callback.pending();
    });

    this.Then("user should not see $todo in the list", function (todo, callback) {
        console.log(todo);
        callback.pending();
    });
};

module.exports = myStepDefinitionsWrapper;