/**
 * Created by Syun on 2016/11/17.
 * 用于存储全局方法或者控件
 */

(function () {
    "use strict";
    angular.module("app")
        .service("AppService",AppService);
        AppService.$inject = ["$ionicLoading","$timeout","$ionicPopup"];
        function AppService($ionicLoading,$timeout,$ionicPopup){
            return{
                ionicLoadingShow(content,timeout){
                    let loadingContent = angular.isUndefined(content) ? "正在载入中..." : content;
                    let isLoadingTimeOut = !angular.isUndefined(timeout);
                    $ionicLoading.show({
                        template:`<div class="row"><ion-spinner icon="ios-small" ></ion-spinner><span class="margin-top-4">${loadingContent}</span></div>`
                    });
                    if(isLoadingTimeOut){
                        $timeout(function(){
                            $ionicLoading.hide()
                        },timeout);
                    }
                },
                ionicAlert(title,template,btn, style){
                    let alertTitle = angular.isUndefined(title) ? "提示" : title;
                    let templateContent = angular.isUndefined(template) ? "" : template;
                    let buttonContent = angular.isUndefined(btn) ? "好" : btn;
                    let btnStyle = angular.isUndefined(style) ? "button-assertive" : style;
                    $ionicPopup.alert({
                        title:alertTitle,
                        template:`<p class="text-center"><b>${templateContent}</b></p>`,
                        buttons:[
                            {
                                text:buttonContent,
                                type:btnStyle
                            }
                        ]
                    })
                },
                ionicConfirm(title,template,okText,okType,cancelText,cancelType,callBack){
                    let confirmTitle = angular.isUndefined(title) ? "提示" : title;
                    let templateContent = angular.isUndefined(template) ? "" : template;
                    let confirmContent = angular.isUndefined(okText) ? "确定" : okText;
                    let confirmStyle = angular.isUndefined(okType) ? "button-assertive" : okType;
                    let cancelContent = angular.isUndefined(cancelText) ? "取消" : cancelText;
                    let cancelStyle = angular.isUndefined(cancelType) ? "button-white" : cancelType;
                    let btnClickCallBack = angular.isUndefined(callBack) ? null : callBack;
                    $ionicPopup.confirm({
                        title:confirmTitle,
                        template:`<p class="text-center"><b>${templateContent}</b></p>`,
                        okText:confirmContent,
                        okType:confirmStyle,
                        cancelText:cancelContent,
                        cancelType:cancelStyle,
                    }).then(function(res){
                        if(res){
                            console.log("you are sure");
                        }
                        else{
                            console.log("you are not sure");
                        }
                    });
                }
            }
        }
})();
