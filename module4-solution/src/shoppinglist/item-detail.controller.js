(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['item_details'];
function ItemDetailController(item_details) {
  var itemDetail = this;
  itemDetail.items = item_details;
}

})();
