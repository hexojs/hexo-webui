angular.module('hexo').factory('modalStack', function(hotkeyService){
  var stack = {},
    id = 0;

  var getTop = function(){
    var keys = Object.keys(stack);

    return stack[keys[keys.length - 1]];
  };

  hotkeyService.on('esc', function(){
    var modal = getTop();

    if (modal) modal.dismiss();
  });

  return {
    add: function(modal){
      stack[modal.id] = modal;
    },
    remove: function(modal){
      delete stack[modal.id];
    },
    close: function(modal, msg){
      stack[modal.id].close(msg);
    },
    dismiss: function(modal){
      stack[modal.id].dismiss(msg);
    },
    getId: function(){
      return id++;
    },
    getTop: getTop
  }
});