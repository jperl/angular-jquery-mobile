'use strict';

var module = angular.module("todo", []);
module.config(function($routeProvider) {
    $routeProvider.when('/settings', {
        templateUrl: 'views/settings.html',
        jqmOptions: {transition: 'slide'}
    });

});

module.factory('todoStore', function($http, $waitDialog) {
    var readUrl = 'https://secure.openkeyval.org/';
    var writeUrl = 'https://secure.openkeyval.org/store/?';

    function read(key) {
        $waitDialog.show();
        return $http({
            method: 'JSONP',
            url: readUrl + key+'?callback=JSON_CALLBACK'
        }).then(function(response) {
                $waitDialog.hide();
                return response.data;
            });
    }

    function write(key, value) {
        $waitDialog.show();
        value = encodeURIComponent(JSON.stringify(value));
        $http({
            method: 'JSONP',
            url: writeUrl + key + '=' + value+'&callback=JSON_CALLBACK'
        }).then(function() {
                $waitDialog.hide();
            });
    }

    return {
        read: read,
        write: write
    }

});
