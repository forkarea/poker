(function(){
	var app = angular.module('gorrionPoker');
	
	app.factory("helpers", function () {
		return {
			setFieldsDirty: function (form) {
				for (var field in form) {
					if (field[0] != "$") {
						form[field].$pristine = false;
						form[field].$dirty = true;
					}
				}
			},
			isCorrectNumber: function (n) {
				return !isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) > 0;
			}
		}
	});
})();