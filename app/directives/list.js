angular.module('hexo').directive('list', function($document){
  return {
    restrict: 'E',
    templateUrl: '/views/common/list.html',
    transclude: true,
    scope: {
      data: '=',
      multiSelect: '=',
      resolve: '='
    },
    link: function(scope, el, attrs){
      angular.forEach(scope.resolve, function(value, key){
        scope[key] = value;
      });
    }
  }
});