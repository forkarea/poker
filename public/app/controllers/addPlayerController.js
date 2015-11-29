(function () {
	var app = angular.module("gorrionPoker");

	app.controller("addPlayerController", function ($scope, players, helpers, $modalInstance) {

		$scope.add = function () {
			if (!$scope.addPlayerForm.$valid) {
				helpers.setFieldsDirty($scope.addPlayerForm);
			}
			else {
				players.addPlayer($scope.player).then(function(response){
					$modalInstance.close();
				});
			}
		}

		$scope.cancel = function () {
			$modalInstance.dismiss();
		}
	});
})();