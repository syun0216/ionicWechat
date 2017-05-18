(function(){
    'use strict';
    angular.module("app",[
        'ionic',
        'app.core',
        'app.business',
        'jett.ionic.filter.bar',
        'ionic-datepicker',
        'ionic-toast',
    ])
})();
(function () {
    'use strict';

    angular.module("app")
        .filter("img", ['appConfig', ImgFilter])
        .filter("subTotal", SubTotal)
        .filter("total", Total)
        .filter("payable", Payable)
        .filter("orderCount",OrderCount)
        .filter("orderListCount",OrderListCount);

    function ImgFilter(appConfig) {
        return function (url,temp) {
            if (url === undefined || url ==null)
                return "assets/images/common_default_icon.png";
            return appConfig.uploadReturnUrl +temp+"/" + url;
        }
    }

    function SubTotal() {
        return function (goods) {
            if (angular.isArray(goods)) {
                var total = 0;
                goods.forEach(function (item) {
                    total += item.price * item.count;
                });
                return total;
            }
            return 0;
        }
    }

    function Total() {
        return function (info) {
            var total = 0;
            if (info && angular.isArray(info.serviceProviderData)) {
                info.serviceProviderData.forEach(function (p) {
                    p.items.forEach(function (item) {
                        total += item.price * item.count;
                    });
                });
                return total;
            }
            return 0;
        }
    }

    function Payable() {
        return function (info) {
            if (info) {
                if (angular.isArray(info.coupon) && info.coupon.length > 0)
                    return Total()(info) - info.coupon[0].price;
                return Total()(info);
            }
            return 0;
        }
    }

    function OrderCount(){
        return function(info){
            var count = 0;
            if (info && angular.isArray(info.serviceProviderData)) {
                info.serviceProviderData.forEach(function (p) {
                    p.items.forEach(function (item) {
                        count += item.count;
                    });
                });
                return count;
            }
            return 0;
        }
    }

    function OrderListCount(){
        return function(order){
            var count = 0;
            if(angular.isArray(order.orderItems))
                count = order.orderItems.length;
            switch (order.type){
                case 1:
                case 2:
                    return "共"+count+"件商品";
                    break;
                case 3:
                case 4:
                case 5:
                case 7:
                    return "共"+count+"项服务";
                default:
                    return "";
            }
        }
    }
 

    function split(){
        return function(input, delimiter){
            var delimiter = delimiter || ','; 
            return input.split(delimiter);
        }
    }

})();
/**
 * Created by Syun on 2016/11/17.
 * 用于存储全局方法或者控件
 */

(function () {
    "use strict";
    angular.module("app")
        .service("AppUtils", AppUtils);
    AppUtils.$inject = ["$ionicLoading", "$timeout", "$ionicPopup", "ionicDatePicker","ionicToast","$ionicHistory","$state","$ionicViewSwitcher","$ionicPlatform"];
    function AppUtils($ionicLoading, $timeout, $ionicPopup, ionicDatePicker,ionicToast,$ionicHistory,$state,$ionicViewSwitcher,$ionicPlatform) {
        var hardWareBack = function (pathName) {
          if($ionicHistory.currentView() == pathName){
              $ionicPlatform.offHardwareBackButton(hardWareBack);
              $ionicViewSwitcher.nextDirection('back');
          }
        };

        return {
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
            ionicLoadingHide(){
                $ionicLoading.hide();
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
            ionDatePicker(from,to,inputDate,callback,disabledDates,disableWeekdays,templateType){
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
                        callback([value.getFullYear(), value.getMonth() + 1, value.getDate()].join("-"));
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
            _log(name,data){
                /*
                全局console.log ,若要禁止则改成 return null
                 */
                if(angular.isUndefined(data)){
                    console.log(name);
                }
                else{
                    console.log(name+" :  "+data);
                }
                // return null;
            },
            stateGo(name,params,direction,isReload){
                /*
                name:string,required
                params:Object,required
                direction:"forward" or "back",required,default:forward
                isReload:boolean,optional
                 */
                this.direction = angular.isUndefined(direction) ? "forward" : direction;
                if(angular.isUndefined(name)||angular.isUndefined(params)) {
                    return;
                }
                $state.go(name,params,isReload);
                $ionicViewSwitcher.nextDirection(this.direction);
            },
            onHardWareBack(){
                $ionicPlatform.onHardwareBackButton(hardWareBack);
            }
        }
    }
})();

/**
 * Created by junwen on 2016/9/7.
 * business 模块
 */
(function () {
    'use strict';
    angular.module("app.business",[
        'app.core'
    ])
})();

/**
 * Created by Syun on 2016/11/17.
 */
(function () {
    "use strict";

    angular.module("app")
        .config(initConfig)
        .run(initRun)
        .service("appConfig", initService);
    initConfig.$inject = ['CacheFactoryProvider', '$cookiesProvider', '$ionicConfigProvider', '$ionicFilterBarConfigProvider','ionicDatePickerProvider'];
    initRun.$inject = ['$http', 'CacheFactory','$rootScope','AppUtils'];
    initService.$inject = ['$cookies'];

    function initConfig(CacheFactoryProvider, $cookiesProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider,ionicDatePickerProvider) {
        angular.extend($cookiesProvider.defaults, {
            path: "/"
        });
        angular.extend(CacheFactoryProvider.defaults, {maxAge: 1}); //缓存10s

        $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.views.swipeBackEnabled(true);
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.platform.android.views.maxCache(0);


        $ionicFilterBarConfigProvider.theme('positive');
        $ionicFilterBarConfigProvider.clear('ion-close');
        $ionicFilterBarConfigProvider.search('ion-search');
        $ionicFilterBarConfigProvider.backdrop(false);
        $ionicFilterBarConfigProvider.transition('vertical');
        $ionicFilterBarConfigProvider.placeholder('Filter');

        var datePickerObj = {
            inputDate: new Date(),
            setLabel: '设定',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: false,
            weeksList: ["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2018, 8, 1),
            showTodayButton: true,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false,
            disableWeekdays: []
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);

    }

    function initRun($http, CacheFactory,$rootScope,AppUtils) {
        $http.defaults.cache = CacheFactory('defaultCache', {
            maxAge: 5 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 5 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });

        $rootScope.$on("$stateChangeStart",_stateChangeStart);
        //监听路由位置
        function _stateChangeStart(event,toState,toParams,fromState,fromParams){
            if(toState.name == "BusinessItem"){
                AppUtils.ionicLoadingShow("item加载中...",1000);
            }

        }
    }

    function initService() {
        var config = {};
        config.mode = 'dev';
        config.providerType = "xx";
        switch (config.mode) {
            case 'debug':
                config.applianceService = "";
                break;
            case 'dev':
                config.businessService = "";
                break;
            case 'p':
                config.apiService = "";
                config.staticServer = "";
                break;
            case 'product':
                config.apiService = "";
                config.staticServer = "";
                break;
        }
        return config;
    }
})();
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
(function(){
    'use strict';

    angular.module("app")
        .directive("goClick",goClick);
    goClick.$inject = ['$location'];
    function goClick($location) {
        return function (scope, element, attrs) {
            var path;

            attrs.$observe('goClick', function (val) {
                path = val;
            });

            element.bind('click', function () {
                scope.$apply(function () {
                    $location.path(path);
                });
            });
        };
    }
})();
(function () {
    'use strict';

    angular.module('app')
        .config(routeConfig);
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        var routes, setRoutes;

        routes = [
            {name: 'BusinessLogin', ctrl: 'BusinessLoginCtrl',ctrlName:"login", url: 'business/login/', tpl: 'business/login/login'},
            {
                name: 'BusinessMainInterface',
                ctrl: 'BusinessMainInterfaceCtrl',
                ctrlName:'mainInterFace',
                url: 'business/mainInterface/:name',
                tpl: 'business/mainInterface/mainInterface'
            },
            {name:'BusinessItem',ctrl:'BusinessItemCtrl',ctrlName:'item',url:'business/item/:itemName',tpl:'business/item/item'},
            {name:'BusinessMyItem',ctrl:'BusinessMyItemCtrl',ctrlName:'myItem',url:'business/myItem/:type',tpl:'business/myItem/myItem'}
        ];

        setRoutes = function (route) {
            var config, name;
            config = {
                url: "/" + route.url,
                templateUrl: 'script/app/' + route.tpl + '.html',
                controller: route.ctrl,
                controllerAs:route.ctrlName
            };
            $stateProvider.state(route.name, config);
            return $stateProvider;
        };


        routes.forEach(function (route) {
            return setRoutes(route);
        });


        $urlRouterProvider.otherwise('/business/login');

    }
})();



(function(){
    'use strict';

    angular.module("app.core",[ 
        'ngCookies',
        'angular-cache',
    ]);
})();
(function () {
    'use strict';
    angular.module("app.core")
        .service("UserService", ['$http', 'appConfig', '$q', 'CacheFactory','$cookies', UserService]);

    function UserService($http, appConfig, $q, CacheFactory,$cookies) {
        if (!CacheFactory.get('userCache')) {
            CacheFactory.createCache('userCache', {
                maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes.
                cacheFlushInterval: 15 * 60 * 1000, // This cache will clear itself every hour.
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
                storageMode: 'sessionStorage' // This cache will use `localStorage`.
            });
        }

        var userCache = CacheFactory.get("userCache");

        function u(e) {
            return appConfig.apiService + e;
        }

        return {  
            isLogin: function () {
                return $cookies.get("phone") != null;
            },
            getDeliveryAddress: function () {
                var e = "/deliveryAddress/addresslist.api";
                var d = $q.defer();
                if (!this.isLogin())
                    d.resolve([]); 
                $http({
                    method: "GET",
                    url: u(e),
                    cache: userCache,
                    params: {phoneno: appConfig.phone}
                }).then(function (res) { 
                    d.resolve(res.data);
                });
                return d.promise;
            },
            getDefaultDeliveryAddress:function(){
                var d = $q.defer();
                this.getDeliveryAddress().then(function(adds){
                        var item = adds.data;
                       for( var i=0; i < item.length; i++ ){
                                if( item[i].isdefault == true ){ 
                                   d.resolve(item[i]);
                                }
                            }
 
                });

                return d.promise;
            },
            region:function(){
                return appConfig.regionId;
            },
            phone:function(){
                return appConfig.phone;
            }
        }
    }

})();
/**
 * Created by junwen on 2016/9/8.
 * each item controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessItemCtrl", BusinessItemCtrl);
    BusinessItemCtrl.$inject = ['$stateParams', 'AppUtils'];
    function BusinessItemCtrl($stateParams, AppUtils) {
        var vm = this;
        vm.itemName = $stateParams.itemName;
        vm.goBack = function () {
            AppUtils.stateGo('BusinessMainInterface', null, "back")
        };
        vm.showFunc = {
            showLoading(){
                AppUtils.ionicLoadingShow("加载中", 3000)
            },
            showAlert(){
                AppUtils.ionicAlert("haha", "hahahahah", "确定")
            },
            showConfirm(){
                AppUtils.ionicConfirm("tips", "nihao", this.clickToCallBack, "yes", null, null, null)
            },
            showToast(){
                "use strict";
                AppUtils.ionToast("This is the content", null, 1000);
            },
            clickToCallBack(){
                "use strict";
                AppUtils._log("itemName", $stateParams.itemName);
            }
        };


    }
})();

/**
 * Created by junwen on 2016/9/8.
 */

/**
 * Created by junwen on 2016/9/7.
 * business controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessLoginCtrl",BusinessLoginCtrl);
    BusinessLoginCtrl.$inject = ['$cookieStore','AppUtils'];
    function BusinessLoginCtrl($cookieStore,AppUtils){
        this.info = {
            phone:"",
            password:""
        };
        this.username = 'june';
        var username = $cookieStore.get("username");
        if(username != null){
            AppUtils.stateGo('BusinessMainInterface',{name:username});
        }

        this.confirmLogin = function () {
            if(this.info.phone == 18022129789 && this.info.password == 1234){
                $cookieStore.put('username',this.username);
                localStorage.username = this.username;
                AppUtils.stateGo('BusinessMainInterface',{name:username});
            }
            else{
                AppUtils.ionicLoadingShow("您输入的账号密码有误",1000);
            }
        }
    }

})();

/**
 * Created by junwen on 2016/9/7.
 * business service
 */
(function () {
    angular.module("app.business")
        .service("BusinessLoginService", BusinessLoginService);
    BusinessLoginService.$inject = ['$http', 'appConfig', '$q', 'CacheFactory'];
        function BusinessLoginService($http, appConfig, $q, CacheFactory){

        }
})();
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

/**
 * Created by junwen on 2016/9/7.
 * mainInterface controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessMainInterfaceCtrl", BusinessMainInterfaceCtrl);
    BusinessMainInterfaceCtrl.$inject = [ '$scope','$stateParams', '$cookieStore', '$ionicFilterBar', '$ionicSideMenuDelegate','AppUtils', '$ionicModal'];
    function BusinessMainInterfaceCtrl( $scope,$stateParams, $cookieStore, $ionicFilterBar, $ionicSideMenuDelegate, AppUtils,$ionicModal) {
        $scope.myName = $stateParams.name == null ? $cookieStore.get('username') : $stateParams.name;
        if ($scope.myName == null) {
            $scope.myName = $cookieStore.get('username');
        }


        //TODO:reorder the list
        //item spinner的数据 在我的页面
        this.itemData = [
            {spinner: "spiral", title: 'cards'},
            {spinner: "android", title: 'Forms'},
            {spinner: "ios", title: 'select'},
            {spinner: "ios-small", title: 'buttons'},
            {spinner: "bubbles", title: 'toggle'},
            {spinner: "circles", title: 'checkbox'},
            {spinner: "lines", title: 'range'},
            {spinner: "ripple", title: 'select'},
            {spinner: "dots", title: 'tab'}
        ];
        //删除项目
        $scope.deleteItem = function (item) {
            $scope.itemData.forEach(function (data) {
                if (data == item) {
                    $scope.itemData.splice($scope.itemData.indexOf(data), 1);
                }
            })
        };

        //侧边菜单栏退出
        $scope.clearCache = function () {
            localStorage.clear();
            $cookieStore.remove('username');
            sessionStorage.clear();
            AppUtils.stateGo("BusinessLogin",null);
        };

        $scope.showConfirm = function () {
            AppUtils.ionicConfirm('Logout','你确定退出吗?',$scope.clearCache,null,null,null,null);
        };

        //搜索框控件
        var filterBarInstance;

        function getItems() {
            var items = [];
            for (var x = 1; x < 2000; x++) {
                items.push({text: '$scope is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
            }
            $scope.items = items;
        }

        getItems();

        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.items,
                update: function (filteredItems, filterText) {
                    $scope.items = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

        $scope.refreshItems = function () {
            if (filterBarInstance) {
                filterBarInstance();
                filterBarInstance = null;
            }

            $timeout(function () {
                getItems();
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };
        //点击itemList里的项目跳转到item页面
        $scope.goToItemDetail = function (item) {
            AppUtils.stateGo('BusinessItem',{itemName: item.text});
        };
        //菜单侧滑出来
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        //日历控件
        this.day = new Date();
        $scope.date = [this.day.getFullYear(),this.day.getMonth() + 1,this.day.getDate()].join("-");
        this.openDatePicker = function (date) {
            AppUtils.ionDatePicker(new Date(),new Date(2017,0,2),new Date(date),(val)=>{
                "use strict";
                $scope.date = val;
            });
        };

        //modal
        //弹出提示信息
        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });
        $scope.openModal1 = function () {
            $scope.modal1.show();
        };
        $scope.closeModal1 = function () {
            $scope.modal1.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal1.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal1.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal1.removed', function () {
            // Execute action
        });
        //点击确定阅读的逻辑
        $scope.check = false;
        $scope.confirmRoles = function () {
            $scope.check = true;
            $scope.closeModal1();
        };
        //我的tab 进入myItem页面
        $scope.goToMyItemDetail = function (type) {
            AppUtils.stateGo('BusinessMyItem',{type:type},"forward")
        }
    }
})();
