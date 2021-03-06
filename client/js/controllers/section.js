angular
.module('blog')
.controller('SectionController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'User', function($scope,
  $state, $stateParams, Post, Section, User) {
  $scope.posts = [];
  $scope.skip = 0;
  $scope.limit = 3000;
  $scope.range = 3000;
  $scope.showMore = true;
	$scope.section_name = "";
  $scope.section = [];

  $scope.getSections = function() {
    Section
    .findOne({
      filter:{
        where: { id: $stateParams.id }
      }
    }
    )
    .$promise
    .then(function(response) {
      $scope.section = response;
	ga('send', 'pageview', '/section/'+response.name);
      $scope.getPosts();
    });
  }
  $scope.getSections();


  $scope.getPosts = function() {
    Post
    .find(
    {
      filter:{
        where: { 
          "sectionId" : $stateParams.id, 
          "isPublished": true 
        },
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
          for(j in $scope.posts){
            if(results[i].id == $scope.posts[j].id) contains = true;
          }
          if(!contains)
            $scope.posts.push(results[i]);
        }

        if(results.length < $scope.range) $scope.showMore = false;


      } else {
        $scope.showMore = false;
      }
    });
  }

  $scope.goToPost = function(slug){
    $state.go('post',{'slug':slug})
  }

}]);
