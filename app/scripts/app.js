"use strict";

angular.module("app", [])
    .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        //bring back #!/ urls by turning OFF html5 paths
        //read more here https://github.com/tigbro/jquery-mobile-angular-adapter/issues/163#issuecomment-17163635
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix("!");

        $routeProvider
            //ex. http://localhost:9000/app/index.html#/about
            .when("/", { templateUrl: "pages/main.html" })
            .when("/about", { templateUrl: "pages/about.html" });

        //prevent reloading the same page
        $(document).bind("pagebeforechange", function (e, data) {
            var to = data.toPage,
                from = data.options.fromPage;

            if (to && to.attr && from && from.attr && to.attr("id") === from.attr("id")) {
                e.preventDefault();
            }
        });
    }])
    .run(function () {
        //fixes the 1px jump on page load
        //https://github.com/jquery/jquery-mobile/issues/2846
        $(function () {
            $.mobile.defaultHomeScroll = 0;
        });
    });