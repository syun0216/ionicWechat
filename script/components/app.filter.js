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