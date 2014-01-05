var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

angular.module('hexo').filter('byte', function(){
  return function(input, base){
    if (!input) return;

    var divide = base == 2 ? 1000 : 1024,
      i = 0;

    while (input / 1024 >= 1){
      input /= 1024;
      i++;
    }

    return +(input.toFixed(2)) + ' ' + units[i];
  }
});