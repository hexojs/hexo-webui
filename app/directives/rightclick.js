// http://stackoverflow.com/a/15732476
angular.module('hexo').directive('ngRightclick', function($parse){
  return function(scope, el, attrs){
    var fn = $parse(attrs.ngRightclick);

    el.on('contextmenu', function(event){
      event.preventDefault();

      scope.$apply(function(){
        fn(scope, {$event: event});
      });
    });
  }
});