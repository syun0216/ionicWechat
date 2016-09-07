/**
 * Created by junwen on 2016/9/7.
 * business controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessLoginCtrl",['$cookieStore','$scope','$state','$ionicLoading','$timeout',BusinessLoginCtrl]);
    function BusinessLoginCtrl($cookieStore,$scope,$state,$ionicLoading,$timeout){
        $scope.info = {
            phone:"",
            password:""
        };
        $scope.username = 'june';
        var username = $cookieStore.get("username");
        if(username != null){
            $state.go('BusinessMainInterface',{name:username});
        }

        $scope.confirmLogin = function () {
            if($scope.info.phone == 18022129789 && $scope.info.password == 1234){
                $cookieStore.put('username',$scope.username);
                localStorage.username = $scope.username;
                $state.go('BusinessMainInterface',{name:$scope.username});
            }
            else{
                $ionicLoading.show({
                    template:"您输入的账号密码有误"
                });
                $timeout(function() {
                        $ionicLoading.hide();
                    },
                    1000);
            }
        }
    }

})();
