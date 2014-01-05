angular.module('hexo').directive('lightbox', function($document, $timeout){
  return {
    restrict: 'E',
    templateUrl: '/views/common/lightbox.html',
    link: function(scope, el, attrs){
      var close = scope.close = function(){
        el.remove();
      };

      var skip = function(page){
        if (page < 0) page = scope.images.length - 1;
        if (page >= scope.images.length) page = 0;

        scope.current = page;
      };

      var prev = scope.prev = function(){
        skip(scope.current - 1);
      };

      var next = scope.next = function(){
        skip(scope.current + 1);
      };

      $document.on('keydown', function(event){
        switch (event.which){
          case 27: // esc
            close();
            break;

          case 37: // left
          case 33: // pageup
            prev();
            scope.$apply();
            break;

          case 39: // right
          case 34: // pagedown
            next();
            scope.$apply();
            break;
        }
      });
    }
  }
});