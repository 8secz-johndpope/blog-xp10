angular
.module('blog')
.controller('PostController', ['$scope', '$state', '$stateParams', 'Post', 'Section', 'User', 'Leads', 'Comment', function($scope,
  $state, $stateParams, Post, Section, User, Leads, Comment) {

  $scope.post = [];
  $scope.comments = [];

  $scope.getPost = function() {
    Post
    .find(
    {
      filter:{
        where: { "slug": $stateParams.slug }
      }
    })
    .$promise
    .then(function(results) {
      $scope.post = results;
      $scope.getComments();
    });
  }
  $scope.getPost();


  $scope.getComments = function() {
    Comment
    .find(
    {
      filter:{
        where: { "postId": $scope.post[0].id },
        order: 'createdDate ASC',
      }
    })
    .$promise
    .then(function(results) {
      $scope.comments = results;
    });
  }

  $scope.validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  $scope.commentPost = function(){


    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Próximo &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [
    {
      title: 'Digite seu nome',
      text: 'Ele aparecerá nos comentários'
    },
    {
      title: 'Digite seu email',
      text: 'Fique tranquilo, ele não será exibido'
    },
    {
      title: 'Digite seu comentário',
      text: ''
    }
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()

      var dataSignUp = {
        "name":result[0],
        "email":result[1]
      }

      if($scope.validateEmail(dataSignUp.email)){

        $scope.lead = Leads.create(dataSignUp);
        if($scope.lead){

          var dataComment = {
            "content":result[2],
            "likes":0,
            "dislikes":0,
            "createdDate":new Date(),
            "lastUpdatedDate":new Date(),
            "postId":$scope.post[0].id,
            "name":dataSignUp.name
          }

          // console.log($scope.post)
          // console.log(dataComment);
          // return;

          $scope.tryComment = Comment.create(dataComment);
          if($scope.tryComment){

            swal(
              'Muito bem!',
              'Seu comentário foi feito com sucesso!',
              'success'
              )
            $scope.getComments();

          } else {
            swal(
              'Ops',
              'Algo deu errado :(',
              'error'
              )
          }

        } else {
          swal(
            'Ops',
            'Algo deu errado :(',
            'error'
            )
        }

      } else {
        swal(
          'Ops',
          'Você precisa de um email válido :)',
          'error'
          )
      }

    }, function () {
      swal.resetDefaults()
    })


  }

}]);