angular.module('hexo').factory('File', function($resource){
  return $resource('/api/files', null, {
    raw: {
      method: 'GET',
      params: {raw: true}
    }
  });
});