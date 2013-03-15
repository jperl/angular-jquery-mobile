# About

This project shows how to use **angular** with **jquery mobile** to build **structured** and **tested** cross platform **HTML5** single page applications!

The [grunt workflow](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js)

- [watches](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js#L28) code for any changes and reloads the page
- [compiles](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js#L15) less into a css file
- [lints](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js#L78) your code against JSHint rules
- [preprocesses](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js#L127) an indexTemplate and builds the index.html so
	- jquery mobile views can be seperated and [inserted](https://github.com/jperl/angular-jquery-mobile/blob/master/app/indexTemplate.html#L17) into the index page
	- angular templates can be [seperated](https://github.com/jperl/angular-jquery-mobile/tree/master/app/templates), [processed](https://github.com/jperl/angular-jquery-mobile/blob/master/Gruntfile.js#L25) then [referenced](https://github.com/jperl/angular-jquery-mobile/blob/master/app/indexTemplate.html#L28) from the index page
	- development [mocks](https://github.com/jperl/angular-jquery-mobile/blob/master/app/indexTemplate.html#L32) can be inserted
- [builds](#build) your code
- [runs unit tests](#testing) with testacular (and soon E2E tests with cucumber-js) to test  your code

# Getting Started

Need to have [node](http://nodejs.org/), [bower](https://github.com/twitter/bower#installing-bower) and [grunt](http://gruntjs.com/getting-started#installing-the-cli) installed.

Clone `git clone git@github.com:jperl/angular-jquery-mobile.git`

Install node and bower packages

	sudo -s
	npm install
	bower install
	bower install --dev

Run the server `grunt server`

# Testing

All testing is ran on [testacular](http://testacular.github.com).

Unit tests use [Jasmine](http://pivotal.github.com/jasmine/).

TODO: E2E tests use [uitest](https://github.com/tigbro/uitest.js) and [cucumber-js](https://github.com/cucumber/cucumber-js).

### Strategy

| Type          | Strategy   | Example     |
| ------------- |:----------:|:-----------:|
| Service       | Unit Test  | [example](https://github.com/jperl/angular-jquery-mobile/blob/master/test/unit/todoStorageSpec.js) |
| Directive     | Unit Test  | [example](https://github.com/jperl/angular-jquery-mobile/blob/master/test/unit/todoSpec.js) |

#####Run tests once on PhantomJS
`grunt ci`

#####Run tests on other browsers

Run the server `grunt server:test` in one terminal, and run the tests in another terminal with the commands below.

| Type          | Run Tests                   |
| ------------- |:---------------------------:|
| Unit Tests    | `grunt testacularRun:unit`  |


Point as many browsers you want to test (mobile devices, other computers) to the testacular server url.

#####View test specifics

Unit Tests  

`grunt server:test` then in the unit testacular window choose [debug](http://localhost:9876/debug.html) at the top.

# Build

`grunt build`

You can serve the built with `grunt server:dist`

# License

MIT License