angular.module('hexo').directive('modal', function(modalStack){
  return {
    restrict: 'E',
    templateUrl: '/views/common/modal.html',
    transclude: true,
    scope: {
      modalTitle: '@'
    },
    controller: function($scope, $attrs){
      $scope.dismiss = function(){
        modalStack.getTop().dismiss();
      };
    }
  }
});