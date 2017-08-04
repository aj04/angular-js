(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$rootScope', 'menuItems'];
    function SignUpController($rootScope, menuItems) {
        var signUpCtrl = this;
        signUpCtrl.submit = function () {
            var items = menuItems.menu_items;
            var item = items.filter(function (item) {
                if(item.short_name === signUpCtrl.user.favDish) {
                    return item;
                }
            });
            if(item.length === 0) {
                signUpCtrl.user.status = "No such menu number exists!";
            } else {
                signUpCtrl.user.favTitle = item[0].name;
                signUpCtrl.user.favDisc = item[0].description;
                signUpCtrl.user.status = "Your information has been saved!";
                $rootScope.$broadcast(
                    'signUp:signUpSubmit',
                    {user:signUpCtrl.user}
                )
            }
        };
    }

})();
