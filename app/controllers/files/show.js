angular.module('hexo').controller('FileShowCtrl', function($scope, $modalInstance, File){
  $scope.file = File.get({path: $modalInstance.path});
});