angular.module('hexo').controller('PostNewCtrl', function($scope, $modalInstance, $state, Post){
  $scope.isSubmitted = false;

  $scope.layouts = [
    {name: 'post', default: true},
    {name: 'page'},
    {name: 'draft'}
  ];

  $scope.post = {
    title: '',
    layout: 'post'
  };

  $scope.create = function(){
    $scope.isSubmitted = true;

    if (!$scope.post.title) return;

    Post.save($scope.post, function(data){
      $modalInstance.close();
      $state.go('edit', {path: data.path});
    });
  };

  $scope.cancel = function(){
    $modalInstance.dismiss();
  };
});