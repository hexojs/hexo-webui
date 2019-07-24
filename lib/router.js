const _ = require('lodash');
const singularize = hexo.util.inflector.singularize;

const Router = module.exports = function(app, path, base, middlewares){
  this.app = app;
  this.path = path || '';
  this.base = base || '';
  this.middlewares = middlewares || [];
};

['get', 'post', 'put', 'del', 'delete', 'all'].forEach(i => {
  Router.prototype[i] = function(){
    const args = _.toArray(arguments);
    const path = args.shift();
    const arr = [];
    const self = this;

    args.forEach(item => {
      if (typeof item === 'string'){
        const actions = item.split('#');
        let fn = require(`../api/controllers/${actions.shift()}`);

        actions.forEach(act => {
          fn = fn[act];
        });

        arr.push(fn);
      } else {
        arr.push(item);
      }
    });

    this.app[i](this.path + path.replace(/\/$/, ''), this.middlewares.concat(arr));
  };
});

Router.prototype.namespace = function(){
  const args = _.toArray(arguments);
  const path = args.shift();
  const callback = args.pop();

  callback(new Router(
    this.app,
    `${this.path + path}/`,
    `${this.base + path}/`,
    this.middlewares.concat(args)
  ));
};

Router.prototype.resources = function(){
  const args = _.toArray(arguments);
  const path = args.shift();
  const self = this;
  let callback;

  if (typeof args[args.length - 1] === 'function'){
    callback = args.pop();
  }

  let options = args.pop();

  if (Array.isArray(options)){
    args.push(options);
    options = {};
  }

  if (!_.isObject(options) || Array.isArray(options)){
    options = {};
  }

  options = _.extend({
    controller: self.base + path,
    name: path,
    param: 'id',
    only: ['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'],
    except: []
  }, options);

  const controller = options.controller;
  const param = options.param;

  _.difference(options.only, options.except).forEach(i => {
    switch (i){
      case 'index':
        self.get(`${path}.:format?`, args, `${controller}#index`);
        break;

      case 'new':
        self.get(`${path}/new.:format?`, args, `${controller}#index`);
        break;

      case 'create':
        self.post(`${path}.:format?`, args, `${controller}#create`);
        break;

      case 'show':
        self.get(`${path}/:${param}.:format?`, args, `${controller}#show`);
        break;

      case 'edit':
        self.get(`${path}/:${param}/edit.:format?`, args, `${controller}#edit`);
        break;

      case 'update':
        self.put(`${path}/:${param}.:format?`, args, `${controller}#update`);
        break;

      case 'destroy':
        self.del(`${path}/:${param}.:format?`, args, `${controller}#destroy`);
        break;
    }
  });

  callback && callback(new Router(
    this.app,
    `${this.path + path}/:${singularize(options.name)}_id/`,
    '',
    this.middlewares.concat(args)
  ));
};