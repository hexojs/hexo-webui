angular.module('hexo').directive('pagination', function(){
  return {
    restrict: 'E',
    templateUrl: '/views/common/pagination.html',
    scope: {
      current: '=',
      total: '=',
      perPage: '='
    },
    controller: function($scope, $attrs){
      $scope.prevText = $attrs.prevText || 'Prev';
      $scope.nextText = $attrs.nextText || 'Next';

      $scope.noPrev = function(){
        return $scope.current <= 1;
      };

      $scope.noNext = function(){
        return $scope.current >= $scope.total;
      };

      $scope.link = function(page){
        return $attrs.url.replace('%d', page);
      };
    }
  }
});