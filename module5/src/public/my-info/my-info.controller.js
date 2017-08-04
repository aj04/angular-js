(function () {
    'use strict';

    angular.module('public')
        .controller('myInfoController', myInfoController);

    myInfoController.$inject = ['$rootScope', 'ApiPath'];
    function myInfoController($rootScope, ApiPath) {
        var myInfoCtrl = this;
        myInfoCtrl.hello = 'before';
        myInfoCtrl.signUpStatus = false;
        var cancelListener = $rootScope.$on(
            'signUp:signUpSubmit',function (event, data) {
                $rootScope.user = data.user;
            }
        );
        myInfoCtrl.user = $rootScope.user;
        if(myInfoCtrl.user) {
            myInfoCtrl.signUpStatus = true;

            myInfoCtrl.api = ApiPath;
        }
    }

})();
