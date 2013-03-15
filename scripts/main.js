/*exported TOOLS*/
var TOOLS = (function (undefined) {
    "use strict";

    var my = {};

    my.applyFixes = function () {
        //fixes the 1px jump on page load
        //https://github.com/jquery/jquery-mobile/issues/2846
        $(function () {
            $.mobile.defaultHomeScroll = 0;
        });
    };

    return my;
})();
(function (undefined) {
    "use strict";

    var app = angular.module("app", []);

    app.run(function () {
        TOOLS.applyFixes();
    });
})();
(function (undefined) {
    "use strict";

    var app = angular.module("app");

    //local storage version
//    app.factory("todoStorage", function () {
//        var STORAGE_ID = "todos-angularjs";
//
//        return {
//            get: function (callback) {
//                callback(JSON.parse(localStorage.getItem(STORAGE_ID) || "[]"));
//            },
//
//            put: function (todos) {
//                localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
//            }
//        };
//    });

    //remote storage version
    app.factory("todoStorage", function ($http, $waitDialog) {
        var readUrl = "https://secure.openkeyval.org/";
        var writeUrl = "https://secure.openkeyval.org/store/?";

        var key = "JQueryMobileAngularTodoapp";

        function get(callback) {
            $waitDialog.show();
            return $http({
                method: "JSONP",
                url: readUrl + key + "?callback=JSON_CALLBACK"
            }).then(function (response) {
                    $waitDialog.hide();
                    callback(response.data);
                });
        }

        function put(value) {
            $waitDialog.show();
            value = encodeURIComponent(JSON.stringify(value));
            $http({
                method: "JSONP",
                url: writeUrl + key + "=" + value + "&callback=JSON_CALLBACK"
            }).then(function () {
                    $waitDialog.hide();
                });
        }

        return {
            get: get,
            put: put
        };
    });
})();
(function (undefined) {
    "use strict";

    var app = angular.module("app");

    app.controller("TodoController", ["$scope", "$location", "todoStorage",
        function ($scope, $location, todoStorage) {
            //initialize scope
            $scope.inputText = "";

            todoStorage.get(function (data) {
                $scope.todos = data;
            });

            //todos functions
            $scope.add = function () {
                $scope.todos.push({name: $scope.inputText, completed: false});
                $scope.inputText = "";
            };

            $scope.save = function () {
                // delete all checked todos
                var newTodos = [], todo;
                for (var i = 0; i < $scope.todos.length; i++) {
                    todo = $scope.todos[i];
                    if (!todo.completed) {
                        newTodos.push(todo);
                    }
                }

                $scope.todos = newTodos;
                todoStorage.put($scope.todos);
            };

            //navigation
            $scope.back = function () {
                $location.goBack();
            };

            $scope.setPage = function (page) {
                $location.url("#" + page);
            };
        }]);
})();
angular.module('app').run(function($templateCache) {
  $templateCache.put('app/templates/todo.html',
    '<div>\n' +
    '    <input type="checkbox" ng-model="todo.completed" id="checked">\n' +
    '    <label for="checked">{{todo.name}}</label>\n' +
    '</div>');
});

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