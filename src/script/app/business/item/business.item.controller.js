/**
 * Created by junwen on 2016/9/8.
 * each item controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessItemCtrl",BusinessItemCtrl);
        BusinessItemCtrl.$inject = ['$scope','$stateParams','$state','AppService'];
        function BusinessItemCtrl($scope,$stateParams,$state,AppService){
            $scope.itemName = $stateParams.itemName;
            $scope.goBack = function () {
                $state.go('BusinessMainInterface');
            };
            $scope.showFunc = {
                showLoading(){AppService.ionicLoadingShow("加载中",3000)},
                showAlert(){AppService.ionicAlert("haha","hahahahah","确定")},
                showConfirm(){AppService.ionicConfirm("tips","nihao","yes",null,null,null,this.clickToCallBack())},
                clickToCallBack(){
                    "use strict";
                    console.log(111);
                }
            };


        }
})();
