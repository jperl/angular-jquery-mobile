"use strict";

angular.module("app")

    //local storage version
//    .factory("todoStorage", function () {
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
    .factory("todoStorage", ["$http", "$waitDialog", function ($http, $waitDialog) {
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
    }]);