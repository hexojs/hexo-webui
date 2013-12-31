var express = require('express'),
  path = require('path'),
  _ = require('lodash'),
  Router = require('./router'),
  util = require('./util');

module.exports = function(args, callback){
  var config = hexo.config,
    log = hexo.log;

  if (!config.email){
    return callback(new Error('Email is required for authorization. Please set your email in _config.yml.'));
  }

  var webuiConfig = config.webui = config.webui || {};

  // Default web UI config
  _.defaults(webuiConfig, {
    password: util.randomString(8, {uppercase: false}),
    port: 5000
  });

  var app = express(),
    port = parseInt(args.p || args.port || webuiConfig.port, 10) || 5000,
    loggerFormat = args.l || args.log,
    baseDir = path.dirname(__dirname);

  // If the port setting is invalid, set to the default port 4000
  if (port > 65535 || port < 1){
    port = 5000;
  }

  if (port === config.port){
    return callback(new Error('Port ' + port + ' is already used by Hexo server. Please assign another port for web UI.'));
  }

  // View engine settings
  app.set('views', path.join(baseDir, 'api', 'views'));
  app.set('view engine', 'ejs');
  app.engine('ejs', hexo.render.renderFile);

  // App level template variables
  app.locals.version = hexo.version;
  app.locals.cache = !hexo.env.debug;

  // Logger
  if (loggerFormat){
    app.use(express.logger(typeof loggerFormat === 'string' ? loggerFormat : config.logger_format));
  } else if (config.logger || hexo.debug){
    app.use(express.logger(config.logger_format));
  }

  // Change response header
  app.use(function(req, res, next){
    res.header('x-powered-by', 'Hexo');
    next();
  });

  // Enable body parsing
  app.use(express.bodyParser());

  // Enable session support
  app.use(express.cookieParser(util.getSessionSecret()));
  app.use(express.cookieSession());

  // Router
  require('../api/routes')(new Router(app, '/'));

  // Static files
  if (hexo.env.debug){
    app.use('/js', express.static(path.join(baseDir, 'app')));
    app.use('/views', express.static(path.join(baseDir, 'views')));
  }

  app.use(express.static(path.join(baseDir, 'public')));

  // gzip
  app.use(express.compress());

  // Start hexo server
  hexo.call('server', {}, function(err){
    if (err) return callback(err);
  });

  // Start web UI server
  hexo.on('server', function(){
    app.listen(port, function(){
      log.i('Web UI is running on port %d. Password: %s', port, webuiConfig.password);
    });
  });
};