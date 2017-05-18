(function(){
    'use strict';

    angular.module("app")
        .controller("AppCtrl",AppCtrl);
        AppCtrl.$inject = ['AppUtils'];
        function AppCtrl(AppUtils){
        if(localStorage.username != undefined && localStorage.username!=null){
            AppUtils.stateGo("BusinessMainInterface",{id:localStorage.username},"forward")
        }
        else{
            AppUtils.stateGo("BusinessLogin",null,"back");
        }
    }
})();