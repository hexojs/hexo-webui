// https://github.com/angular-ui/ui-router/issues/92#issuecomment-29160259
angular.module('hexo').directive('back', function($rootScope, $state){
  return {
    restrict: 'A',
    scope: {
      defaultState: '@',
      defaultParams: '='
    },
    link: function(scope, el, attrs){
      el.on('click', function(){
        if ($rootScope.prevState.name){
          $state.go($rootScope.prevState, $rootScope.prevStateParams);
        } else {
          $state.go(scope.defaultState, scope.defaultParams);
        }
      });
    }
  }
});