angular
.module('blog')
.controller('CalcController', ['$scope', '$state', '$stateParams', 'Landing', 'Leads', function($scope,
	$state, $stateParams, Landing, Leads) {

	ga('send', 'pageview', '/calculadora');

	$scope.calc_ok = false;
	$scope.func_prod = "";
	$scope.func_media = "";
	$scope.func_perda = "";


	// $scope.canDownload = false;
	$scope.data = {};
	$scope.data.name = "";
	$scope.data.email = "";
	$scope.data.faturamento = "";
	$scope.data.func = "";


	$scope.calcProd = function(){
		//Valor em reais da produção de um americano na PEA para o cálculo
		return parseFloat($scope.data.faturamento/(291479*$scope.data.func)*100).toFixed(2);
	}

	$scope.calcProdPessoa = function(){
		//Valor em reais da produção de um funcionário
		return parseFloat($scope.data.faturamento/$scope.data.func).toFixed(2);
	}

	$scope.calcProdPerda = function(){
		//Valor em reais da perda
		return parseFloat((291479*$scope.data.func) - $scope.data.faturamento).toFixed(2);
	}

	$scope.calc = function(){
		var dataSignUp = {
			"name":$scope.data.name,
			"email":$scope.data.email
		}

		$scope.func_prod = $scope.calcProd();
		$scope.func_media = $scope.calcProdPessoa();
		$scope.func_perda = $scope.calcProdPerda();

		$scope.lead = Leads.create(dataSignUp);
		if($scope.lead){
			$scope.calc_ok = true;
		}
	}



}]);