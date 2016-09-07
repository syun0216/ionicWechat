/**
 * Created by junwen on 2016/9/7.
 * mainInterface controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessMainInterfaceCtrl",['$scope','$stateParams','$cookieStore','$state',BusinessMainInterfaceCtrl]);
    function BusinessMainInterfaceCtrl($scope,$stateParams,$cookieStore,$state){
        $scope.myName = $stateParams.name;
        $scope.clearCache = function () {
            localStorage.clear();
            $cookieStore.remove('username');
            sessionStorage.clear();
            $state.go("BusinessLogin")
        }
    }
})();
