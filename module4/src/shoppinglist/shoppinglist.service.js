(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout', '$http', '$stateParams'];
function ShoppingListService($q, $timeout, $http, $stateParams) {
  var service = this;

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      $http.get("https://davids-restaurant.herokuapp.com/categories.json")
      .success(function (data) {
         deferred.resolve(data);
      })
      .error(function() {
         deferred.reject("Failed to get albums");
      });
    }, 8);

    return deferred.promise;
  };

  service.getItems1 = function (itemId) {
    var deferred = $q.defer();
console.log(itemId);
    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      $http.get("https://davids-restaurant.herokuapp.com/menu_items.json?category="+itemId)
      .success(function (data) {
         deferred.resolve(data.menu_items);
      })
      .error(function() {
         deferred.reject("Failed to get Item Details");
      });
    }, 8);

    return deferred.promise;
  };

}

})();
