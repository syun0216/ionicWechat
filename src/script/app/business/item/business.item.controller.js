/**
 * Created by junwen on 2016/9/8.
 * each item controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessItemCtrl",BusinessItemCtrl);
        BusinessItemCtrl.$inject = ['$scope','$stateParams','AppUtils'];
        function BusinessItemCtrl($scope,$stateParams,AppUtils){
            $scope.itemName = $stateParams.itemName;
            $scope.goBack = function () {
                AppUtils.stateGo('BusinessMainInterface',null,"back")
            };
            $scope.showFunc = {
                showLoading(){AppUtils.ionicLoadingShow("加载中",3000)},
                showAlert(){AppUtils.ionicAlert("haha","hahahahah","确定")},
                showConfirm(){AppUtils.ionicConfirm("tips","nihao",this.clickToCallBack,"yes",null,null,null)},
                showToast(){
                    "use strict";
                    AppUtils.ionToast("This is the content",null,1000);
                },
                clickToCallBack(){
                    "use strict";
                    console.log(111);
                }
            };


        }
})();
