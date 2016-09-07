(function(){
    'use strict';

    angular.module("app")
        .controller("AppCtrl",['$state','$rootScope','$cookieStore','BusinessLoginService',function($state,$rootScope,$cookieStore,BusinessLoginService){
            //if(!angular.isDefined(BusinessLoginService.userInfo()) && window.location.href.indexOf('/#/business/login/')==-1){
            //    window.location.href='/#/business/login/';
            //}
            if(localStorage.username != undefined && localStorage.username!=null){
                $state.go('BusinessLogin',{id:localStorage.username});
            }
            else{
                $state.go('BusinessMainInterface');
            }

            /*document.addEventListener("deviceready", function () {

                var type = $cordovaNetwork.getNetwork();

                var isOnline = $cordovaNetwork.isOnline();

                var isOffline = $cordovaNetwork.isOffline();


                // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                    var onlineState = networkState;
                })

                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                    var offlineState = networkState;
                })

            }, false);*/
        }]);
})();