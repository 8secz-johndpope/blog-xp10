angular
.module('blog')
.controller('SearchController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'User', function($scope,
  $state, $stateParams, Post, Section, User) {

  ga('send', 'pageview', '/search/'+$stateParams.q);

  $scope.termo = $stateParams.q;

	$scope.posts = [];
  $scope.skip = 0;
  $scope.limit = 3000;
  $scope.range = 30000;
  $scope.showMore = true;

  $scope.getPosts = function() {
    Post
    .find(
    {
      filter:{
        where: {
          or:[
            {"title":{like: '%'+$scope.termo+'%'}},
            {"subtitle":{like: '%'+$scope.termo+'%'}},
            {"content":{like: '%'+$scope.termo+'%'}},
            {"tags":{like: '%'+$scope.termo+'%'}},
            {"slug":{like: '%'+$scope.termo+'%'}}
          ],
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
  $scope.getPosts();

  $scope.goToPost = function(slug){
    $state.go('post',{'slug':slug})
  }

}]);
