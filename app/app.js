angular.module('hexo', [
  'ngRoute',
  'ngResource',
  'ui.router'
]).config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: '/views/home/index.html'
    })
    .state('posts/index', {
      url: '/posts?page',
      controller: 'PostIndexCtrl',
      templateUrl: '/views/posts/index.html'
    })
    .state('posts/new', {
      url: '/posts/new',
      controller: 'PostNewCtrl',
      templateUrl: '/views/posts/edit.html'
    })
    .state('posts/edit', {
      url: '/posts/:id/edit',
      controller: 'PostEditCtrl',
      templateUrl: '/views/posts/edit.html'
    });
}).run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    $rootScope.prevState = fromState;
    $rootScope.prevStateParams = fromParams;
  });
});