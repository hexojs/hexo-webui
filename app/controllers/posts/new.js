angular.module('hexo').controller('PostNewCtrl', function($scope, $state, Post){
  $scope.post = {
    title: 'New Post',
    raw: ''
  };

  $scope.noDestroy = true;

  $scope.save = function(){
    //
  };
});