angular.module('hexo').service('lightbox', function($http, $rootScope, $compile, $templateCache, $body, hotkeyService){
  var templateUrl = '/views/common/lightbox.html',
    scope = $rootScope.$new(),
    element = null;

  var html = $http.get(templateUrl, {
    cache: $templateCache
  }).then(function(response){
    return response.data;
  });

  scope.images = [];
  scope.current = 0;
  scope.isOpening = false;

  var open = this.open = scope.open = function(images){
    images.forEach(function(item, i){
      if (item.current) scope.current = i;
    });

    scope.images = images;
    scope.isOpening = true;

    if (element) return;

    html.then(function(html){
      element = angular.element(html);
      $body.append(element);
      $compile(element)(scope);
    });
  };

  var close = this.close = scope.close = function(){
    scope.isOpening = false;
  };

  var skip = this.skip = scope.skip = function(page){
    if (page < 0) page = scope.images.length - 1;
    if (page >= scope.images.length) page = 0;

    scope.current = page;
  };

  var prev = this.prev = scope.prev = function(){
    skip(scope.current - 1);
  };

  var next = this.next = scope.next = function(){
    skip(scope.current + 1);
  };

  hotkeyService.on('esc', function(){
    close();
    scope.$apply();
  });

  hotkeyService.on('left', function(){
    prev();
    scope.$apply();
  });

  hotkeyService.on('right', function(){
    next();
    scope.$apply();
  });
});