var _ = require('lodash');

var Post = hexo.model('Post'),
  validators = require('../validators/posts');

exports.index = [validators.index, function(req, res, next){
  var form = req.form;

  var data = Post
    .sort(form.orderby, form.order)
    .skip(form.skip)
    .limit(form.limit)
    .toArray();

  if (form.select && form.select.length){
    var select = _.uniq(form.select);

    data = _.map(data, function(item){
      return _.pick(item, select);
    });
  }

  res.json({
    entry: data,
    total: Post.count(),
    skip: form.skip,
    limit: form.limit
  });
}];

exports.show = [validators.show, function(req, res, next){
  var form = req.form;

  var data = Post.get(form.id);

  if (!data) return res.send(404);

  if (form.select && form.select.length){
    data = _.pick(data, _.uniq(form.select));
  }

  res.json(data);
}];

exports.create = function(req, res, next){
  //
};

exports.update = function(req, res, next){
  //
};

exports.destroy = function(req, res, next){
  //
};

exports.preview = function(req, res, next){
  //
};