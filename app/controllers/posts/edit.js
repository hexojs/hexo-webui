angular.module('hexo').controller('PostEditCtrl', function($scope, $stateParams, Post){
  $scope.post = Post.get({
    id: $stateParams.id,
    select: ['_id', 'title', 'raw']
  });

  $scope.noDestroy = false;

  $scope.save = function(){
    //
  };

  $scope.destroy = function(){
    //
  };
});