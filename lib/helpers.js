const path = require('path');
const _ = require('lodash');
const { renderSync } = hexo.render;
const file = hexo.util.file2;
const { version } = require('../package.json');
const assetSrc = path.join(path.dirname(__dirname), 'assets', 'assets.yml');
let assets = renderSync({path: assetSrc});

const findAssets = (data, name) => {
  const arr = [];

  [].concat(data.common, data[name]).forEach(item => {
    if (!item) return;

    if (typeof item === 'string'){
      arr.push(item);
    } else if (item.dev){
      arr.push(item.dev);
    }
  });

  return _.compact(arr);
};

const cssTag = (arr, versionTag) => {
  if (!Array.isArray(arr)) arr = [arr];

  const result = arr.map(item => {
    if (!item) return;

    return `<link href="/css/${item}.css${versionTag ? `?v=${version}` : ''}" rel="stylesheet" type="text/css">`;
  });

  return result.join('\n');
};

const scriptTag = (arr, versionTag) => {
  if (!Array.isArray(arr)) arr = [arr];

  const result = arr.map(item => {
    if (!item) return;

    return `<script src="/js/${item}.js${versionTag ? `?v=${version}` : ''}" type="text/javascript"></script>`;
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
file.watch(assetSrc, () => {
  assets = renderSync({path: assetSrc});
});