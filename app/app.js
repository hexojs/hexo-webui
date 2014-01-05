angular.module('hexo', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.codemirror'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider
    .when('/list', '/list/')
    .when('/posts', '/posts/1')
    .otherwise('/list/');

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('posts', {
      abstract: true,
      url: '/posts',
      controller: 'PostIndexCtrl',
      templateUrl: '/views/posts/index.html'
    })
    .state('posts.list', {
      url: '/{page:[0-9]+}',
      controller: 'PostListCtrl',
      templateUrl: '/views/posts/list.html'
    })
    .state('list', {
      url: '/list/*path',
      controller: 'FileListCtrl',
      templateUrl: '/views/files/list.html'
    })
    .state('edit', {
      url: '/edit/*path',
      controller: 'FileEditCtrl',
      templateUrl: '/views/files/edit.html'
    });
}).run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.prevState = fromState;
    $rootScope.prevStateParams = fromParams;
  });
});