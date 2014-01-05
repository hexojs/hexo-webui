angular.module('hexo').controller('FileEditCtrl', function($scope, $stateParams, File){
  $scope.editorOptions = {
    lineWrapping: true
  };

  File.get({path: $stateParams.path, content: true}, function(data){
    $scope.file = data;
    $scope.editorOptions.mode = data.type;
  });
});