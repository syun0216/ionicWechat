/**
 * Created by junwen on 2016/9/7.
 * business service
 */
(function () {
    angular.module("app.business")
        .service("BusinessLoginService", BusinessLoginService);
    BusinessLoginService.$inject = ['$http', 'appConfig', '$q', 'CacheFactory'];
        function BusinessLoginService($http, appConfig, $q, CacheFactory){

        }
})();