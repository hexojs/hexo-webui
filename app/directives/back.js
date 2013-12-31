// https://github.com/angular-ui/ui-router/issues/92#issuecomment-29160259
angular.module('hexo').directive('back', function($rootScope, $state, $parse){
  return {
    restrict: 'A',
    link: function(scope, el, attrs){
      var defaultState = {},
        defaultParams = {};

      el.on('click', function(){
        if ($rootScope.prevState.name){
          $state.go($rootScope.prevState, $rootScope.prevStateParams);
        } else {
          $state.go(defaultState, defaultParams);
        }
      });

      attrs.$observe('defaultState', function(){
        defaultState = attrs.defaultState;
      });

      attrs.$observe('defaultParams', function(){
        defaultParams = $parse(attrs.defaultParams);
      });
    }
  }
});