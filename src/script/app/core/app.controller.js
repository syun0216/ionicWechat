(function(){
    'use strict';

    angular.module("app")
        .controller("AppCtrl",AppCtrl);
        AppCtrl.$inject = ['$state','$rootScope','$cookieStore','BusinessLoginService'];
        function AppCtrl($state,$rootScope,$cookieStore,BusinessLoginService){
        //if(!angular.isDefined(BusinessLoginService.userInfo()) && window.location.href.indexOf('/#/business/login/')==-1){
        //    window.location.href='/#/business/login/';
        //}
        if(localStorage.username != undefined && localStorage.username!=null){
            $state.go('BusinessMainInterface',{id:localStorage.username});
        }
        else{
            $state.go('BusinessLogin');
        }

    }
})();