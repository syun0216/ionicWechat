/**
 * Created by junwen on 2016/9/8.
 * each item controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessItemCtrl",BusinessItemCtrl);
        BusinessItemCtrl.$inject = ['$stateParams','AppUtils'];
        function BusinessItemCtrl($stateParams,AppUtils){
            this.itemName = $stateParams.itemName;
            this.goBack = function () {
                AppUtils.stateGo('BusinessMainInterface',null,"back")
            };
            this.showFunc = {
                showLoading(){AppUtils.ionicLoadingShow("加载中",3000)},
                showAlert(){AppUtils.ionicAlert("haha","hahahahah","确定")},
                showConfirm(){AppUtils.ionicConfirm("tips","nihao",this.clickToCallBack,"yes",null,null,null)},
                showToast(){
                    "use strict";
                    AppUtils.ionToast("This is the content",null,1000);
                },
                clickToCallBack(){
                    "use strict";
                    AppUtils._log("itemName",$stateParams.itemName);
                }
            };


        }
})();
