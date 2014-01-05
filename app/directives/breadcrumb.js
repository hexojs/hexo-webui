angular.module('hexo').directive('breadcrumb', function(){
  var init = function($scope, $attrs){
    var breadcrumbs = $scope.breadcrumbs = [],
      path = $scope.path,
      url = $scope.url,
      maxLevel = +$scope.maxLevel || 3;

    breadcrumbs.push({
      name: $scope.defaultText || 'Home',
      path: url.replace('%s', $scope.defaultPath || ''),
      current: !path
    });

    if (!path) return;

    var arr = path.split('/'),
      length = arr.length;

    for (var i = 0; i < length; i++){
      breadcrumbs.push({
        name: arr[i],
        path: url.replace('%s', arr.slice(0, i + 1).join('/')),
        current: i === length - 1
      });
    }

    length++;

    if (length > maxLevel){
      $scope.dropdown = breadcrumbs.splice(0, length - maxLevel);
    }
  };

  return {
    restrict: 'E',
    templateUrl: '/views/common/breadcrumb.html',
    scope: {
      path: '=',
      defaultText: '@',
      defaultPath: '@',
      url: '@',
      maxLevel: '@'
    },
    controller: function($scope, $attrs){
      $scope.$watch('path', function(){
        if ($scope.path == null) return;

        init($scope, $attrs);
      }, true);
    }
  }
});