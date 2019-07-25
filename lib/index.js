hexo.extend.console.register('webui', 'Web UI', {
  options: [
    {name: '-p, --port', desc: 'Override the default port'},
    {name: '-l, --log [format]', desc: 'Enable logger. Override the logger format.'}
  ]
}, require('./server'));

const helpers = require('./helpers');

hexo.extend.helper.register('asset_css', helpers.asset_css);
hexo.extend.helper.register('asset_js', helpers.asset_js);