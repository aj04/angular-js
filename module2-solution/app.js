(function(){

angular.module("ShoppingList", [])
.controller("ControllerListBuy", ControllerListBuy)
.controller("ControllerBoughtList", ControllerBoughtList)
.service("ShoppingListService", ShoppingListService);


  ControllerListBuy.$inject = ["ShoppingListService"];
  function ControllerListBuy(ShoppingListService) {
    var itemList = this;

    itemList.list = "";
    itemList.list = ShoppingListService.getItems();
    itemList.boughtItem = function(itemIndex) {
      try{
        ShoppingListService.boughtItem(itemIndex);
      } catch (error) {
        itemList.errorMessage = error.message;
      }
    }
  };

  ControllerBoughtList.$inject = ["ShoppingListService"];
  function ControllerBoughtList(ShoppingListService) {
    var boughtList = this;
    boughtList.boughtItems = ShoppingListService.getBoughtItems();
    if(boughtList.boughtItems.length < 1) {
       boughtList.errorMessage = "Nothing bought yet.";
    }
  }

  function ShoppingListService() {
    var service = this;
    var boughtList = [];
    var items = [
         {name:"cookies" , quantity : 10},
         {name:"chips"   , quantity : 15},
         {name:"lays"    , quantity : 15},
         {name:"funyuns" , quantity : 15},
         {name:"gummy"   , quantity : 15}
        ];
    
    service.getItems = function () {
      return items;  
    };

    service.getBoughtItems = function () {
      return boughtList;
    };

    service.boughtItem = function (itemIndex) {
      var itemBought = {
        name         : items[itemIndex].name,
        quantity     : items[itemIndex].quantity
      };
      boughtList.push(itemBought);
      items.splice(itemIndex, 1);
      if (items.length < 1) {
        throw new Error("Everything is bought!");
      }
    }              
  }
})();