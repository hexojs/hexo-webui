angular.module('hexo').factory('Post', function($resource){
  return $resource('/api/posts/:id', {id: '@id'}, {
    list: {method: 'GET'},
    update: {method: 'PUT'}
  });
});