angular.module('hexo').factory('ContextMenu', function($q, $http, $rootScope, $templateCache, $compile, $controller, $body, hotkeyService){
  var element = null;

  var close = function(){
    if (!element) return;

    element.remove();
    element = null
  };

  hotkeyService.on('esc', function(){
    close();
  });

  $body.on('click', function(){
    close();
  });

  return function(options){
    var controller = options.controller || angular.noop,
      container = angular.element(options.container || document.body),
      event = options.event,
      menu = {},
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

    menu.result = resultDeferred.promise;

    menu.open = function(){
      html.then(function(html){
        if (element) element.remove();

        var scope = (options.scope || $rootScope).$new();

        var ctrlLocals = {
          $scope: scope,
          $menuInstance: menu
        };

        var ctrl = $controller(controller, ctrlLocals);
        element = angular.element(html);

        element.css({
          top: event.pageY + 'px',
          left: event.pageX + 'px'
        });

        container.append(element);
        $compile(element)(scope);
      });
    };

    menu.close = function(msg){
      if (!element) return;

      close();
      resultDeferred.resolve(msg);
    };

    menu.dismiss = function(msg){
      if (!element) return;

      close();
      resultDeferred.reject(msg);
    };

    menu.notify = function(msg){
      resultDeferred.notify(msg);
    };

    return menu;
  }
});