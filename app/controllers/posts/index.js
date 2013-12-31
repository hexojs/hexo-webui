angular.module('hexo').controller('PostIndexCtrl', function($scope, $stateParams, Post){
  var page = $scope.page = +$stateParams.page || 1;

  Post.list({select: ['_id', 'title'], skip: 50 * (page - 1)}, function(data){
    $scope.posts = data.entry;
    $scope.skip = data.skip;
    $scope.total = Math.ceil(data.total / data.limit);
    $scope.limit = data.limit;
  });
});