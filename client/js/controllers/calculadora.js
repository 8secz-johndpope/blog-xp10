angular
.module('blog')
.controller('CalcController', ['$scope', '$state', '$stateParams', 'Landing', 'Leads', function($scope,
	$state, $stateParams, Landing, Leads) {

	$scope.canDownload = false;
	$scope.data = {};
	$scope.data.name = "";
	$scope.data.email = "";


	$scope.landing = [];
	
	$scope.height = (window.innerHeight > 800) ? window.innerHeight-230 + 'px' : '';

	$scope.getLanding = function() {
		Landing.findOne(
		{
			filter:{
				where: { "slug": $stateParams.slug }
			}
		})
		.$promise
		.then(function(results) {
			$scope.landing = results;
		});
	}
	$scope.getLanding();

	$scope.downloadEbook = function(){
		var dataSignUp = {
			"name":$scope.data.name,
			"email":$scope.data.email
		}
		$scope.lead = Leads.create(dataSignUp);
		if($scope.lead){
			$scope.canDownload = true;
		}
	}



}]);