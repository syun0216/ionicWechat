(function () {
    'use strict';
    angular.module("app.core")
        .service("UserService", ['$http', 'appConfig', '$q', 'CacheFactory','$cookies', UserService]);

    function UserService($http, appConfig, $q, CacheFactory,$cookies) {
        if (!CacheFactory.get('userCache')) {
            CacheFactory.createCache('userCache', {
                maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes.
                cacheFlushInterval: 15 * 60 * 1000, // This cache will clear itself every hour.
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
                storageMode: 'sessionStorage' // This cache will use `localStorage`.
            });
        }

        var userCache = CacheFactory.get("userCache");

        function u(e) {
            return appConfig.apiService + e;
        }

        return {  
            isLogin: function () {
                return $cookies.get("phone") != null;
            },
            getDeliveryAddress: function () {
                var e = "/deliveryAddress/addresslist.api";
                var d = $q.defer();
                if (!this.isLogin())
                    d.resolve([]); 
                $http({
                    method: "GET",
                    url: u(e),
                    cache: userCache,
                    params: {phoneno: appConfig.phone}
                }).then(function (res) { 
                    d.resolve(res.data);
                });
                return d.promise;
            },
            getDefaultDeliveryAddress:function(){
                var d = $q.defer();
                this.getDeliveryAddress().then(function(adds){
                        var item = adds.data;
                       for( var i=0; i < item.length; i++ ){
                                if( item[i].isdefault == true ){ 
                                   d.resolve(item[i]);
                                }
                            }
 
                });

                return d.promise;
            },
            region:function(){
                return appConfig.regionId;
            },
            phone:function(){
                return appConfig.phone;
            }
        }
    }

})();