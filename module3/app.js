(function () {
'use strict';

angular.module('NarrowItDownApp1', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
        templateUrl: 'loader/itemsloaderindicator.template.html',
         scope:{
              // prop : value, prop should be for directive and value from parent caller
              //menu would be for the scope of the template
              menu: '<',
              title : '@title',
              onRemove: '&'
         }
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = "";
  menu.originalTitle = "Total Search Results : ";
  menu.errorMessage = "";

  menu.getMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm.toLowerCase());
      promise.then(function (foundItems) {
          menu.found = foundItems;
          menu.title = menu.originalTitle + " " + menu.found.length;
          menu.errorMessage = "Nothing found";
      })
      .catch(function (error) {
          menu.errorMessage = "No results found";
      })
  };
  menu.title = menu.originalTitle + " " + menu.found.length;

  menu.removeItem = function(itemIndex){
      menu.lastRemoved = "Last item removed was " + menu.found[itemIndex].name;
      menu.found.splice(itemIndex, 1);
      menu.title = menu.originalTitle + " " + menu.found.length;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
            var menu_items = result.data.menu_items;
            var foundItems = menu_items.filter(function (item) {
                if(item.description.indexOf(searchTerm) !== -1) {
                    return item;
                }
            });
            return foundItems;
        });
        return response;
    };
}

})();
