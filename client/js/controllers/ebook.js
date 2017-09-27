angular
.module('blog')
.controller('EbookController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'Leads', 'Landing', function($scope,
  $state, $stateParams, Post, Section, Leads, Landing) {

  ga('send', 'pageview', '/ebooks');

  $scope.ebook = [];
  $scope.skip = 0;
  $scope.limit = 3000;
  $scope.range = 30000;
  $scope.showMore = true;
  //$scope.height = (window.innerHeight > 800) ? window.innerHeight-230 + 'px' : '';

  $scope.getEbook = function() {
    Landing
    .find(
    {
      filter:{
        order: 'createdDate DESC',
        skip: $scope.skip,
        limit: $scope.limit
      },
    })
    .$promise
    .then(function(results) {
      if(results.length > 0){
        $scope.skip = $scope.limit;
        $scope.limit = $scope.limit + $scope.range;

        var until = results.length;
        //resolvendo bug do loopback
        if(results.length > $scope.range)
          until = $scope.range;


        //hack para não pegar conteúdo das promisses
        for(i=0; i <= until-1; i++){
          var contains = false;
          //resolvendo bug do loopback
          for(j in $scope.ebook){
            if(results[i].id == $scope.ebook[j].id) contains = true;
          }
          if(!contains)
            $scope.ebook.push(results[i]);
        }

        if(results.length < $scope.range) $scope.showMore = false;


      } else {
        $scope.showMore = false;
      }
  });
  }
  $scope.getEbook();

  $scope.goToLanding = function(slug){
    $state.go('landing',{'slug':slug})
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
