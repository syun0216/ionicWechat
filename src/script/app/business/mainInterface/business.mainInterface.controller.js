/**
 * Created by junwen on 2016/9/7.
 * mainInterface controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessMainInterfaceCtrl", ['$scope', '$stateParams', '$cookieStore', '$state', '$ionicFilterBar', '$ionicSideMenuDelegate', '$ionicPopup', BusinessMainInterfaceCtrl]);
    function BusinessMainInterfaceCtrl($scope, $stateParams, $cookieStore, $state, $ionicFilterBar, $ionicSideMenuDelegate, $ionicPopup) {
        $scope.myName = $stateParams.name == null ? $cookieStore.get('username') : $stateParams.name;
        if ($scope.myName == null) {
            $scope.myName = $cookieStore.get('username');
        }
        $scope.clearCache = function () {
            localStorage.clear();
            $cookieStore.remove('username');
            sessionStorage.clear();
            $state.go("BusinessLogin")
        };

        var filterBarInstance;

        function getItems() {
            var items = [];
            for (var x = 1; x < 2000; x++) {
                items.push({text: 'This is item number ' + x + ' which is an ' + (x % 2 === 0 ? 'EVEN' : 'ODD') + ' number.'});
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

        $scope.goToItemDetail = function (item) {
            $state.go('BusinessItem', {itemName: item.text});
        }

        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout',
                template: '你确定退出吗?',
                buttons:[{
                    text:"取消",
                    type:"button-default",
                    onTap: function (e) {
                       return null;
                    }
                },{
                    text:"确定",
                    type:"button-assertive",
                    onTap: function (e) {
                        $scope.clearCache();
                    }
                }]
            });
        };

    }
})();
