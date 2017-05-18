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


