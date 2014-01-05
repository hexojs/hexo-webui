angular.module('hexo').factory('Modal', function($q, $http, $templateCache, $controller, $rootScope, $compile, modalStack){
  return function(options){
    var controller = options.controller || angular.noop,
      container = angular.element(options.container || document.body),
      element = null,
      modal = {},
      html;

    if (options.templateUrl){
      html = $http.get(options.templateUrl, {
        cache: $templateCache
      }).then(function(response){
        return response.data;
      });
    } else if (options.template){
      var deferred = $q.defer();
      deferred.resolve(options.template);
      html = deferred.promise;
    } else {
      throw new Error('One of `template` or `templateUrl` is required.')
    }

    var resultDeferred = $q.defer();

    modal.id = modalStack.getId();
    modal.result = resultDeferred.promise;

    modal.open = function(){
      html.then(function(html){
        if (element) return;

        var scope = (options.scope || $rootScope).$new();

        var ctrlLocals = {
          $scope: scope,
          $modalInstance: modal
        };

        var ctrl = $controller(controller, ctrlLocals);

        element = angular.element(html);
        container.append(element);
        modalStack.add(modal);

        $compile(element)(scope);
      });
    };

    modal.close = function(msg){
      if (!element) return;

      element.remove();
      resultDeferred.resolve(msg);
      modalStack.remove(modal);
      element = null;
    };

    modal.dismiss = function(msg){
      if (!element) return;

      element.remove();
      resultDeferred.reject(msg);
      modalStack.remove(modal);
      element = null;
    };

    modal.notify = function(msg){
      resultDeferred.notify(msg);
    };

    return modal;
  }
});