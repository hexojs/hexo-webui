angular.module('hexo').service('baseService', function($rootScope){
  this.title = function(title){
    $rootScope.title = (title ? title + ' | ' : '') + 'Hexo Web UI';
  };
});