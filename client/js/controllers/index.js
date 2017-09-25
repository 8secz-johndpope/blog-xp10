angular
.module('blog')
.controller('IndexController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'User', 'Leads', function($scope,
  $state, $stateParams, Post, Section, User, Leads) {
  $scope.sections = [];

  $scope.data = {};
  $scope.data.name = "";
  $scope.data.email = "";

  $scope.getSections = function() {
    Section
    .find()
    .$promise
    .then(function(results) {
      $scope.sections = results;
    });
  }
  $scope.getSections();

  console.log()

  $scope.goToSection = function(id){
    $state.go('section',{'id':id})
  }

  $scope.signUp = function(){
    $scope.lead = Leads.create($scope.data);
    if($scope.lead){
      swal(
        'Tudo certo!',
        'Seu email foi cadastrado com sucesso!',
        'success'
        )
    }
  }

}]);