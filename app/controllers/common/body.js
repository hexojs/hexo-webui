angular.module('hexo').controller('BodyCtrl', function($scope){
  $scope.isSiteNavOn = false;

  var openSiteNav = $scope.openSiteNav = function(){
    $scope.isSiteNavOn = true;
  };

  var closeSiteNav = $scope.closeSiteNav = function(){
    $scope.isSiteNavOn = false;
  };

  $scope.toggleSiteNav = function(){
    $scope.isSiteNavOn ? closeSiteNav() : openSiteNav();
  };
});