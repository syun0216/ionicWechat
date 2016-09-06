(function () {
'use strict';

angular.module('app')
      .config(['$stateProvider','$urlRouterProvider',routeConfig]);


      function routeConfig($stateProvider, $urlRouterProvider) {

         var routes, setRoutes;

         routes = [
             {name:'BusinessLogin',ctrl:'BusinessLoginCtrl',url:'business/login/',tpl:'business/login/login'},
             {name:'BusinessMainInterface',ctrl:'BusinessMainInterfaceCtrl',url:'business/mainInterface/:id?:orderNumb',tpl:'business/mainInterface/mainInterface'},
             {name:'BusinessList',ctrl:'BusinessListCtrl',url:'business/list/:id/:type/:orderNumb/:reload',tpl:'business/list/list'},
             {name:'BusinessDetail',ctrl:'BusinessDetailCtrl',url:'business/detail/:id?:number?:type?:orderNumb',tpl:'business/detail/detail'},
             {name:'BusinessStatistics',ctrl:'BusinessStatisticsCtrl',url:'business/statistics/:id/?:time?:timeValue?:distribution?' +
                    ':distributionValue?:paymenttype?:paymenttypeValue',tpl:'business/statistics/statistics'},
                 {name:'BusinessApplianceList',ctrl:'BusinessApplianceListCtrl',url:'business/appliance/list/:status',tpl:'business/appliance/list/list'},
                 {name:'BusinessApplianceDetail',cache:'false',ctrl:'BusinessApplianceDetailCtrl',url:'business/appliance/detail/:id:status:sqldbOrderId',tpl:'business/appliance/detail/detail'},
                 {name:'BusinessApplianceSelect',ctrl:'BusinessApplianceSelectCtrl',url:'business/appliance/select/:id:edit',tpl:'business/appliance/select/select'},
                 {name:'BusinessApplianceSelectAll',ctrl:'BusinessApplianceSelectAllCtrl',url:'business/appliance/selectAll/:id:edit',tpl:'business/appliance/selectAll/selectAll'}
         ];

         setRoutes = function (route) {
                  var config,name; 
                  config = {
                      url: "/" + route.url,
                      templateUrl: 'script/app/' + route.tpl + '.html',
                      controller:route.ctrl
                  };
                  $stateProvider.state(route.name,config);
                  return $stateProvider;
           };

          
          routes.forEach(function (route) {
                  return setRoutes(route); 
           });

        

          $urlRouterProvider.otherwise('/business/mainInterface');

        } 
})();


