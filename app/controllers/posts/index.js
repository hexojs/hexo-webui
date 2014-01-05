angular.module('hexo').controller('PostIndexCtrl', function($scope, $stateParams, baseService, Post, Modal){
  baseService.title('Posts');

  $scope.create = function(){
    var modal = Modal({
      templateUrl: '/views/posts/new.html',
      controller: 'PostNewCtrl'
    });

    modal.open();
  };
});