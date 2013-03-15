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