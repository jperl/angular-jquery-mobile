"use strict";

angular.module("app", [])
    .run(function () {
        //fixes the 1px jump on page load
        //https://github.com/jquery/jquery-mobile/issues/2846
        $(function () {
            $.mobile.defaultHomeScroll = 0;
        });
    });