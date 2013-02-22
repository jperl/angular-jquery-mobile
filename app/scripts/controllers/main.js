angular.module("todo").controller('TodoController', function($scope, $location, todoStore) {
    $scope.storageKey = 'JQueryMobileAngularTodoapp';
    $scope.data = {
        todos: [],
        inputText: ''
    };
    $scope.addTodo = function() {
        $scope.todos.push({name: $scope.inputText, done: false});
        $scope.inputText = '';
    };
    $scope.showSettings = function() {
        $location.url("/settings");
    };
    $scope.back = function() {
        $location.goBack();
    };
    $scope.refreshTodos = function() {
        todoStore.read($scope.storageKey).then(function(data) {
            if (!data) {
                data = [];
            }
            $scope.todos = data;
        });
    };
    $scope.saveTodos = function() {
        // delete all checked todos
        var newTodos = [], todo;
        for (var i=0; i<$scope.todos.length; i++) {
            todo = $scope.todos[i];
            if (!todo.done) {
                newTodos.push(todo);
            }
        }
        $scope.todos = newTodos;
        todoStore.write($scope.storageKey, $scope.todos);
    }
});