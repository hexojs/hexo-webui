angular.module('hexo').directive('download', function($rootElement, $timeout){
  return {
    restrict: 'A',
    link: function(scope, el, attrs){
      el.on('click', function(event){
        event.preventDefault();

        var iframe = angular.element('<iframe style="display: none;" src="' + attrs.href + '"></iframe>');

        $rootElement.find('body').append(iframe);
        iframe.on('load', function(){
          $timeout(function(){
            iframe.remove();
          }, 1000);
        });
      });
    }
  }
});