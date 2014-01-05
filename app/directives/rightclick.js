// http://stackoverflow.com/a/15732476
angular.module('hexo').directive('ngRightClick', function(){
  return {
    restrict: 'A',
    scope: {
      ngRightClick: '&'
    },
    link: function(scope, el, attrs){
      el.on('contextmenu', function(event){
        event.preventDefault();
        scope.ngRightClick(scope, {$event: event});
      });
    }
  }
});