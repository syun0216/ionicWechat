/**
 * Created by junwen on 2016/9/9.
 * my item view
 */
'use strict';
(function(){
    angular.module("app.business")
        .controller("BusinessMyItemCtrl",BusinessMyItemCtrl);
        BusinessMyItemCtrl.$inject = ["$scope","$stateParams","AppUtils"];
        function BusinessMyItemCtrl($scope,$stateParams,AppUtils){
            var vm = this;
            vm.goBack = function(){
                AppUtils.stateGo('BusinessMainInterface',null,"back");
            };
            vm.typeOfItem = $stateParams.type;
        }
})();
