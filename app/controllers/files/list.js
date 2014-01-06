angular.module('hexo').controller('FileListCtrl', function($scope, $stateParams, $location, baseService, File, Modal, lightbox, ContextMenu){
  var editableTypes = [
    'text/plain',
    'text/x-markdown',
    'text/css',
    'text/html',
    'application/javascript'
  ];

  var previewableTypes = [
    'image/png',
    'image/jpeg',
    'image/bmp',
    'image/gif'
  ];

  File.get({path: $stateParams.path || '/'}, function(data){
    baseService.title(data.path ? data.name : 'Home');

    data.entry.forEach(function(item){
      item.isEditable = editableTypes.indexOf(item.type) > -1;
      item.link = link(item);
      item.iconClass = iconClass(item);
    });

    $scope.path = data.path;
    $scope.files = data.entry;
  });

  var link = function(file){
    if (file.is_dir){
      var action = 'list';
    } else if (file.isEditable){
      var action = 'edit';
    } else {
      return '/api/files/' + file.path + '?raw=true';
    }

    return '/' + action + '/' + file.path;
  };

  var isStartWith = function(str, start){
    return str.substring(0, start.length) === start;
  };

  var iconClass = function(file){
    var type = file.type;

    if (type === 'directory'){
      return 'folder';
    } else if (type === 'application/javascript' || type === 'text/html' || type === 'text/css'){
      return 'code';
    } else if (isStartWith(type, 'text')){
      return 'text';
    } else if (isStartWith(type, 'image')){
      return 'image';
    } else if (isStartWith(type, 'audio')){
      return 'audio';
    } else if (isStartWith(type, 'video')){
      return 'video';
    }
  };

  var enter = function(file){
    if (~previewableTypes.indexOf(file.type)){
      var images = [];

      $scope.files.forEach(function(item){
        images.push({
          name: item.name,
          src: item.link,
          download: '/api/files/' + item.path + '?download=true',
          current: item.name === file.name
        });
      });

      lightbox.open(images);
    } else {
      var modal = Modal({
        controller: 'FileShowCtrl',
        templateUrl: '/views/files/show.html'
      });

      modal.path = file.path;
      modal.open();
    }
  };

  $scope.listActions = {
    show: function(event, file){
      if (file.isEditable || file.is_dir) return;

      event.preventDefault();
      enter(file);
    },
    dblclick: function(file){
      if (file.isEditable || file.is_dir){
        $location.url(file.link);
      } else {
        enter(file);
      }
    },
    rightClick: function(event, file){
      var menu = ContextMenu({
        controller: 'FileContextMenuCtrl',
        templateUrl: '/views/files/context-menu.html',
        event: event
      });

      menu.path = file.path;
      menu.open();
    }
  }

  $scope.newFolder = function(){
    var modal = Modal({
      controller: 'FileNewFolderCtrl',
      templateUrl: '/views/files/new-folder.html'
    });

    modal.path = $scope.path;
    modal.open();
  };
});