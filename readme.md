# About

This project shows how to use **angular** with **jquery mobile** to build structured and **tested** cross platform **HTML5** single page applications!

The main frameworks are [angular](angularjs.org), [jquery mobile](http://view.jquerymobile.com/1.3.0/), and most importantly the [adapter](https://github.com/tigbro/jquery-mobile-angular-adapter).

The [grunt workflow](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js)

- watches code for any changes and reloads the page
- compiles less into a css file
- lints your code against JSHint rules
- preprocesses an indexTemplate and builds the index.html so
	- jquery mobile pages can be seperated and inserted into the index page
	- angular templates can be seperated, processed, and inserted into the index page
	- development mocks can be inserted
- builds and minifies your code
- runs unit and E2E [tests](#testing) with karma

# Getting Started

Need to have [node](http://nodejs.org/), bower (`sudo npm install -g bower`), karma (`sudo npm install -g karma`), and grunt (`npm install -g grunt-cli`) installed.

Clone `git clone git@github.com:jperl/angular-jquery-mobile.git`

Install node and bower packages

	sudo npm install && sudo grunt install

Run the server with `grunt server` and open the application [here](localhost:9000\app\index.html) (`localhost:9000\app\index.html`).

# Testing

All testing is ran on [karma](http://karma-runner.github.com/).

Unit tests use [Jasmine](http://pivotal.github.com/jasmine/).

Acceptance / E2E tests use [cucumber](https://github.com/jperl/karma-cucumber). Learn more about gherkin writing style [here](https://github.com/cucumber/cucumber/wiki).

### Strategy

| Type             | Test Type   | Example     |
| ---------------- |:-----------:|:-----------:|
| Service          | Unit Test   | [example](https://github.com/jperl/angular-jquery-mobile/blob/master/test/unit/todoStorageSpec.js)|
| Directive        | Unit Test   | [example](https://github.com/jperl/angular-jquery-mobile/blob/master/test/unit/todoSpec.js) |
| Acceptance / E2E | Cucumber Feature Test | [feature](https://github.com/jperl/angular-jquery-mobile/blob/master/test/features/user_adds_todo.feature), [step definition](https://github.com/jperl/angular-jquery-mobile/blob/master/test/features/step_definitions/myStepDefinitions.js) |

#####**Until the [karma adapter](https://github.com/jperl/karma-cucumber/issues/1) is complete you can only run cucumber tests manually

#####Run (unit) tests once with PhantomJS
`grunt ci`

#####Run (unit) tests on other browsers

Run the server in one terminal and run the tests in another terminal with `karma run`.

| Test Type      | Server                 |
| -------------- |:----------------------:|
| Unit Tests     | `grunt server:testUnit`|
| Cucumber Tests | Coming Soon            |

Point as many browsers that you want to test (mobile devices, other computers) to the karma server url.

#####Manually run tests

| Test Type     | Run Them                    |
| ------------- |:---------------------------:|
| Unit Tests    | `grunt server:test` then in the unit karma window choose [debug](http://localhost:9876/debug.html) at the top  |
| Acceptance / Cucumber Tests | `grunt server` then open the [runner](http://localhost:9000/test/CucumberFeatureRunner.html) |

# Build

`grunt build`

Serve it `grunt server:dist` and open it [here](localhost:9000\dist\index.html) (`localhost:9000\dist\index.html`)

# License

MIT License
