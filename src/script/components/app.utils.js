/**
 * Created by Syun on 2016/11/17.
 * 用于存储全局方法或者控件
 */

(function () {
    "use strict";
    angular.module("app")
        .service("AppUtils", AppUtils);
    AppUtils.$inject = ["$ionicLoading", "$timeout", "$ionicPopup", "ionicDatePicker","ionicToast","$ionicHistory","$state","$ionicViewSwitcher"];
    function AppUtils($ionicLoading, $timeout, $ionicPopup, ionicDatePicker,ionicToast,$ionicHistory,$state,$ionicViewSwitcher) {
        return {
            routeInfo:null,
            ionicLoadingShow(content, timeout){
                let loadingContent = angular.isUndefined(content) ? "正在载入中..." : content;
                let isLoadingTimeOut = !angular.isUndefined(timeout);
                $ionicLoading.show({
                    template: `<div class="row"><ion-spinner icon="ios-small" ></ion-spinner><span class="margin-top-4">${loadingContent}</span></div>`
                });
                if (isLoadingTimeOut) {
                    $timeout(function () {
                        $ionicLoading.hide()
                    }, timeout);
                }
            },
            ionicAlert(title, template, btn, style){
                let alertTitle = angular.isUndefined(title) ? "提示" : title;
                let templateContent = angular.isUndefined(template) ? "" : template;
                let buttonContent = angular.isUndefined(btn) ? "好" : btn;
                let btnStyle = angular.isUndefined(style) ? "button-assertive" : style;
                $ionicPopup.alert({
                    title: alertTitle,
                    template: `<p class="text-center"><b>${templateContent}</b></p>`,
                    buttons: [
                        {
                            text: buttonContent,
                            type: btnStyle
                        }
                    ]
                })
            },
            ionicConfirm(title, template, callBack,okText, okType, cancelText, cancelType){
                let confirmTitle = angular.isUndefined(title) ? "提示" : title;
                let templateContent = angular.isUndefined(template) ? "" : template;
                let btnClickCallBack = angular.isUndefined(callBack) ? null : callBack;
                let confirmContent = angular.isUndefined(okText) ? "确定" : okText;
                let confirmStyle = angular.isUndefined(okType) ? "button-assertive" : okType;
                let cancelContent = angular.isUndefined(cancelText) ? "取消" : cancelText;
                let cancelStyle = angular.isUndefined(cancelType) ? "button-white" : cancelType;
                $ionicPopup.confirm({
                    title: confirmTitle,
                    template: `<p class="text-center"><b>${templateContent}</b></p>`,
                    okText: confirmContent,
                    okType: confirmStyle,
                    cancelText: cancelContent,
                    cancelType: cancelStyle,
                }).then(function (res) {
                    if (res) {
                        btnClickCallBack();
                    }
                    else {
                        return null;
                    }
                });
            },
            ionDatePicker(from,to,inputDate,disabledDates,disableWeekdays,templateType){
                /*
                 inputDate:用于选择默认的日期,默认日期为今天
                 disabledDates(Optional) : 用于禁止点击某些指定的日期. Default value is an empty array.
                 templateType:popup || modal
                 from:起始日期 example:new Date(2012,1,1);
                 to:结束日期 example: new Date(2016,1,1);
                 dateFormat:Defaults,dd-MM-yyyy
                 showTodayButton:显示今天按钮与否,默认为true
                 disableWeekdays:接受一个数组,0-6分别代表着Sunday - Saturday example:[0,6] disable Sunday and Saturday
                 */
                let obj = {
                    callback(val){
                        let value = new Date(val);
                        console.log([value.getFullYear(), value.getMonth() + 1, value.getDate()].join("-")) ;
                    },
                    mondayFirst:true,
                    closeOnSelect:false,
                };
                obj.from = angular.isUndefined(from) ? new Date(2012,1,1) : from;
                obj.to = angular.isUndefined(to) ? new Date(2020,1,1) : to;
                obj.inputDate = angular.isUndefined(inputDate) ? new Date() : inputDate;
                obj.disabledDates = angular.isUndefined(disabledDates) ? [] : disabledDates;
                obj.disabledWeekdays = angular.isUndefined(disableWeekdays) ? [] : disableWeekdays;
                obj.templateType = angular.isUndefined(templateType) ? 'popup' : templateType;
                ionicDatePicker.openDatePicker(obj);
            },
            ionToast(message,position,timeout){
                let obj = {};
                obj.message = message == null ? "" : message;
                obj.position = position == null ? "bottom" : position;
                obj.timeout = timeout == null ? "2000" :timeout;
                obj.stick = false;
                ionicToast.show(obj.message,obj.position,obj.stick,obj.timeout);
            },
            saveRouteInfo(info){
                /*
                用于存储app运行中路由栈信息
                 */
                this.routeInfo = info;
            },
            judgeRouteLocationWithRouteName(name){
                /*
                用于判断当前路由栈的位置,如果相等则返回true
                 */
                console.log(this.routeInfo.name == name);
                return this.routeInfo.name == name;
            },
            hardWareBack(pathName){

            },
            _log(name,data){
                /*
                全局console.log ,若要禁止则改成 return null
                 */
                console.log(name+" :  "+data);
                // return null;
            },
            stateGo(name,params,direction,isReload){
                /*
                name:string,
                params:Object,
                direction:"forward" or "back",
                isReload:boolean,optional
                 */
                this.direction = angular.isUndefined(direction) ? "forward" : direction;
                if(angular.isUndefined(name)||angular.isUndefined(params)) {
                    return;
                }
                $state.go(name,params,isReload);
                $ionicViewSwitcher.nextDirection(this.direction);
            }
        }
    }
})();
