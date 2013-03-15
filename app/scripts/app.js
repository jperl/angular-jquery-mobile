(function (undefined) {
    "use strict";

    var app = angular.module("app", []);

    app.run(function () {
        TOOLS.applyFixes();
    });
})();