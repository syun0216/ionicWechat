(function(){
    'use strict';

    angular.module("app")
        .directive("goClick",['$location',goClick])
    

    function goClick($location) {
        return function (scope, element, attrs) {
            var path;

            attrs.$observe('goClick', function (val) {
                path = val;
            });

            element.bind('click', function () {
                scope.$apply(function () {
                    $location.path(path);
                });
            });
        };
    }

 

      
})();