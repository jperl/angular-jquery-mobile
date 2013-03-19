angular.module('app').run(function($templateCache) {
  $templateCache.put('app/templates/todo.html',
    '<div>\n' +
    '    <input type="checkbox" ng-model="todo.completed" id="checked">\n' +
    '    <label for="checked">{{todo.name}}</label>\n' +
    '</div>');
});
