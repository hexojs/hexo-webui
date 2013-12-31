var path = require('path'),
  _ = require('lodash'),
  renderSync = hexo.render.renderSync,
  file = hexo.util.file2,
  version = require('../package.json').version;

var assetSrc = path.join(path.dirname(__dirname), 'assets', 'assets.yml'),
  assets = renderSync({path: assetSrc});

var findAssets = function(data, name){
  var arr = [];

  [].concat(data.common, data[name]).forEach(function(item){
    if (!item) return;

    if (typeof item === 'string'){
      arr.push(item);
    } else if (item.dev){
      arr.push(item.dev);
    }
  });

  return _.compact(arr);
};

var cssTag = function(arr, versionTag){
  if (!Array.isArray(arr)) arr = [arr];

  var result = _.map(arr, function(item){
    if (!item) return;

    return '<link href="/css/' + item + '.css' + (versionTag ? '?v=' + version : '') + '" rel="stylesheet" type="text/css">';
  });

  return result.join('\n');
};

var scriptTag = function(arr, versionTag){
  if (!Array.isArray(arr)) arr = [arr];

  var result = _.map(arr, function(item){
    if (!item) return;

    return '<script src="/js/' + item + '.js' + (versionTag ? '?v=' + version : '') + '" type="text/javascript"></script>';
  });

  return result.join('\n');
};

exports.asset_css = function(name){
  if (this.cache){
    return cssTag(['common', name], true);
  }

  return cssTag(findAssets(assets.css, name));
};

exports.asset_js = function(name){
  if (this.cache){
    return scriptTag(['common', name], true);
  }

  return scriptTag(findAssets(assets.js, name));
};

// Watch asset file change
file.watch(assetSrc, function(){
  assets = renderSync({path: assetSrc});
});