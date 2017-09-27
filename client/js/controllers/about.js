angular
.module('blog')
.controller('AboutController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'User', 'Leads', 'Comment', function($scope,
  $state, $stateParams, Post, Section, User, Leads, Comment) {

  $scope.data = {};
  $scope.data.name = "";
  $scope.data.email = "";
  $scope.data.otherInformation = "";


  $scope.height = (window.innerHeight > 800) ? window.innerHeight-445 + 'px' : '';

  ga('send', 'pageview', '/contato');

  $scope.signUp = function(){
    $scope.lead = Leads.create($scope.data);
    if($scope.lead){
      swal(
        'Tudo certo!',
        'Sua mensagem foi enviado com sucesso!',
        'success'
        )
    }
  }

}]);
