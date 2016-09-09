/**
 * Created by junwen on 2016/9/9.
 * my item view
 */
'use strict';
(function(){
    angular.module("app.business")
        .controller("BusinessMyItemCtrl",["$scope","$stateParams","$state",BusinessMyItemCtrl]);
        function BusinessMyItemCtrl($scope,$stateParams,$state){
            $scope.goBack = function(){
                $state.go('BusinessMainInterface');
            };
            $scope.typeOfItem = $stateParams.type;
        }
})();
