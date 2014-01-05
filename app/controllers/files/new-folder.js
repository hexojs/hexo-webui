angular.module('hexo').controller('FileNewFolderCtrl', function($scope, $modalInstance, File){
  $scope.isSubmitted = false;

  $scope.create = function(){
    $scope.isSubmitted = true;

    File.save({path: $modalInstance.path + '/' + $scope.name, folder: true}, function(data){
      $modalInstance.close();
    });
  };

  $scope.cancel = function(){
    $modalInstance.dismiss();
  };
});