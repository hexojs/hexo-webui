angular.module('hexo').directive('pagination', function(){
  return {
    restrict: 'E',
    templateUrl: '/views/common/pagination.html',
    scope: {
      current: '=',
      total: '=',
      perPage: '=',
      prevText: '@',
      nextText: '@',
      url: '@'
    },
    controller: function($scope, $attrs){
      $scope.noPrev = function(){
        return $scope.current <= 1;
      };

      $scope.noNext = function(){
        return $scope.current >= $scope.total;
      };

      $scope.link = function(page){
        return $scope.url.replace('%d', page);
      };
    }
  }
});