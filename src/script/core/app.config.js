(function () {
    'use strict';

    angular.module("app")
        .config(['CacheFactoryProvider', '$cookiesProvider','$ionicConfigProvider', function (CacheFactoryProvider, $cookiesProvider,$ionicConfigProvider) {
            angular.extend($cookiesProvider.defaults, {
                path: "/"
            });
            angular.extend(CacheFactoryProvider.defaults, {maxAge: 1}); //缓存10s

            //$ionicConfigProvider.views.transition('none');
            $ionicConfigProvider.views.swipeBackEnabled(false);
            $ionicConfigProvider.tabs.style("striped");
            $ionicConfigProvider.views.maxCache(0);
            $ionicConfigProvider.scrolling.jsScrolling(false);
            $ionicConfigProvider.platform.android.views.maxCache(0);


        }])
        .run(['$http', 'CacheFactory', function ($http, CacheFactory) {
            $http.defaults.cache = CacheFactory('defaultCache', {
                maxAge: 5 * 1000, // Items added to this cache expire after 15 minutes
                cacheFlushInterval: 5 * 1000, // This cache will clear itself every hour
                deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
            });
        }])
        .service("appConfig", ['$cookies', function ($cookies) {
            var config = {};
            config.mode = 'dev';
            //config.regionId = $cookies.get("regionId");
            //config.phone = $cookies.get("phone");
            config.providerType = "送水";
            config.staticServer = "http://app.wang-guanjia.com";
            switch (config.mode) {
                case 'debug':
                    config.applianceService = "http://192.168.1.89:9095/einsurance-service";
                    break;
                case 'dev':
                    config.businessService = "http://120.76.163.231:8080/vmanagerStore";
                    config.orderList ="vmanager://web?url="+encodeURIComponent("http://112.74.25.112/app/#/order/list");
                    if ($cookies.get("regionId") == null)
                       $cookies.put("regionId", "A3B16F7E-14A8-424B-AD7F-5B68889E5C3A");
                    if ($cookies.get("phone") == null)
                       // $cookies.put("phone", "13202439389");
                       // $cookies.put("phone", "13166001707");
                       $cookies.put("phone", "18676576551");
                    break;
                case 'p':
                    config.apiService = "http://api.wang-guanjia.com";
                    config.staticServer = "http://admin.wang-guanjia.com";
                    break;
                case 'product':
                    config.apiService = "http://api.wang-guanjia.com";
                    config.staticServer = "http://admin.wang-guanjia.com";
                    break;
            }

           return config;
        }]);
})();