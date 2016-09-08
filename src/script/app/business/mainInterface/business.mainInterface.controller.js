/**
 * Created by junwen on 2016/9/7.
 * mainInterface controller
 */
(function () {
    angular.module("app.business")
        .controller("BusinessMainInterfaceCtrl", ['$scope', '$stateParams', '$cookieStore', '$state', '$ionicFilterBar','ionicDatePicker', '$ionicSideMenuDelegate', '$ionicPopup','$ionicModal', BusinessMainInterfaceCtrl]);
    function BusinessMainInterfaceCtrl($scope, $stateParams, $cookieStore, $state, $ionicFilterBar,ionicDatePicker, $ionicSideMenuDelegate, $ionicPopup,$ionicModal) {
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

        //日历控件
        var ipObj1 = {
            callback: function (val) {  //Mandatory
                console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            disabledDates: [            //Optional
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2012, 1, 1), //Optional
            to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
        };

        $scope.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        //modal
        //弹出提示信息
        $ionicModal.fromTemplateUrl('modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal1 = modal;
        });
        $scope.openModal1 = function() {
            $scope.modal1.show();
        };
        $scope.closeModal1 = function() {
            $scope.modal1.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal1.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal1.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal1.removed', function() {
            // Execute action
        });

        $scope.check = false;
        $scope.confirmRoles = function () {
            $scope.check = true;
            $scope.closeModal1();
        }
    }
})();
