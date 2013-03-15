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