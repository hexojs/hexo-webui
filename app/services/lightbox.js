angular.module('hexo').factory('lightbox', function($q, $http, $rootScope, $compile){
  var defaultTemplate = '<lightbox></lightbox>';

  return function(options){
    var container = angular.element(options.container || document.body),
      html;

    if (options.templateUrl){
      html = $http.get(options.templateUrl, {
        cache: $templateCache
      }).then(function(response){
        return response.data;
      });
    } else {
      var deferred = $q.defer();
      deferred.resolve(options.template || defaultTemplate);
      html = deferred.promise;
    }

    html.then(function(html){
      var scope = (options.scope || $rootScope).$new();
      element = angular.element(html);

      scope.images = options.images || [];
      scope.current = 0;

      scope.images.forEach(function(item, i){
        if (item.current) scope.current = i;
      });

      container.append(element);
      $compile(element)(scope);
    });
  }
});