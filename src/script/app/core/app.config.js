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
    initRun.$inject = ['$http', 'CacheFactory'];
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

    function initRun($http, CacheFactory) {
        $http.defaults.cache = CacheFactory('defaultCache', {
            maxAge: 5 * 1000, // Items added to this cache expire after 15 minutes
            cacheFlushInterval: 5 * 1000, // This cache will clear itself every hour
            deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
        });
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