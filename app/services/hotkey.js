var keymap = {
  'backspace': 8,
  'tab': 9,
  'return': 13,
  'enter': 13,
  'pause': 19,
  'break': 19,
  'capslock': 20,
  'esc': 27,
  'escape': 27,
  'space': 32,
  'pageup': 33,
  'pagedown': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'del': 46,
  '0': 96,
  '1': 97,
  '2': 98,
  '3': 99,
  '4': 100,
  '5': 101,
  '6': 102,
  '7': 103,
  '8': 104,
  '9': 105,
  '*': 106,
  '+': 107,
  '-': 109,
  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'numlock': 144,
  'scroll': 145,
  ',': 188,
  '.': 190,
  '/': 191
};

angular.module('hexo').service('hotkeyService', function($document){
  var stack = {};

  $document.on('keydown', function(event){
    var code = event.which;

    if (event.shiftKey) code += '_shift';
    if (event.ctrlKey) code += '_ctrl';
    if (event.altKey) code += '_alt';
    if (event.metaKey && !event.ctrlKey) code += '_meta';

    var arr = stack[code];

    if (!arr || !arr.length) return;

    for (var i = 0, len = arr.length; i < len; i++){
      arr[i].call(this, event);
    }
  });

  var parseCode = function(code){
    var split = code.toLowerCase().split('+'),
      str = keymap[split.pop()];

    if (~split.indexOf('shift')) str += '_shift';
    if (~split.indexOf('ctrl') || ~split.indexOf('control')) str += '_ctrl';
    if (~split.indexOf('alt')) str += '_alt';
    if (~split.indexOf('cmd') || ~split.indexOf('command') || ~split.indexOf('meta')) str += '_meta';

    return str;
  };

  this.on = this.bind = function(code, fn){
    var key = parseCode(code);

    if (!stack.hasOwnProperty(key)) stack[key] = [];

    stack[key].push(fn);

    return this;
  };

  this.off = this.unbind = function(code, fn){
    var key = parseCode(code),
      arr = stack[key] || [],
      fnString = fn.toString();

    for (var i = 0, len = arr.length; i < len; i++){
      if (arr[i].toString() === fnString){
        arr.splice(i, 1);
      }
    }

    return this;
  };
});