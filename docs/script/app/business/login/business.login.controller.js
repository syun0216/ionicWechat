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
