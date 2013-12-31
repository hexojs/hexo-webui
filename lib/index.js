hexo.extend.console.register('webui', 'Web UI', require('./server'));

var helpers = require('./helpers');

hexo.extend.helper.register('asset_css', helpers.asset_css);
hexo.extend.helper.register('asset_js', helpers.asset_js);