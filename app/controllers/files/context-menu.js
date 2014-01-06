angular.module('hexo').controller('FileContextMenuCtrl', function($scope, $menuInstance){
  $scope.path = $menuInstance.path;
});