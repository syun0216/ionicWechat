(function(){
    'use strict';

    angular.module("app")
        .controller("AppCtrl",AppCtrl);
        AppCtrl.$inject = ['$state','$rootScope','$cookieStore','BusinessLoginService'];
        function AppCtrl($state,$rootScope,$cookieStore,BusinessLoginService){
        if(localStorage.username != undefined && localStorage.username!=null){
            $state.go('BusinessMainInterface',{id:localStorage.username});
        }
        else{
            $state.go('BusinessLogin');
        }

    }
})();