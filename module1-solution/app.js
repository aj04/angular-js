(function(){

angular.module("LunchCheck", [])

.controller("LunchCheckController", LunchCheckController);
LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
	$scope.LunchList = "";
	$scope.message = "";
	$scope.CheckIfTooMuch= function(){
		if( $scope.LunchList == "") {
		  $scope.message = "Please enter data first";
		  return;
		}
	   var temp = $scope.LunchList.split(',');
	   if(temp.length > 0 && temp.length <= 3) {
	   	 $scope.message = "Enjoy";
	   } else {
	   	 $scope.message = "Too Much";
	   }
	};
};
})();