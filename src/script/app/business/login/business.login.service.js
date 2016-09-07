/**
 * Created by junwen on 2016/9/7.
 * business service
 */
(function () {
    angular.module("app.business")
        .service("BusinessLoginService", ['$http', 'appConfig', '$q', 'CacheFactory', BusinessLoginService]);
        function BusinessLoginService($http, appConfig, $q, CacheFactory){

        }
})();