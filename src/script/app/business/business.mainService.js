/**
 * Created by G150SG on 2016/9/8.
 * business main service
 */
(function () {
    angular.module("app.business")
        .service("BusinessMainService", ['$http', 'appConfig', '$q', 'CacheFactory', BusinessMainService]);
    function BusinessMainService($http, appConfig, $q, CacheFactory){

    }
})();