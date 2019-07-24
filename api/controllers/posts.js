const _ = require('lodash');

const Post = hexo.model('Post');
const validators = require('../validators/posts');

exports.index = [validators.index, (req, res, next) => {
  const form = req.form;

  let data = Post
    .sort(form.orderby, form.order)
    .skip(form.skip)
    .limit(form.limit)
    .toArray();

  if (form.select && form.select.length){
    const select = _.uniq(form.select);

    data = _.map(data, item => _.pick(item, select));
  }

  res.json({
    entry: data,
    total: Post.count(),
    skip: form.skip,
    limit: form.limit
  });
}];

exports.show = [validators.show, (req, res, next) => {
  const form = req.form;
  let data = Post.get(form.id);

  if (!data) return res.send(404);

  if (form.select && form.select.length){
    data = _.pick(data, _.uniq(form.select));
  }

  res.json(data);
}];

exports.create = [validators.create, (req, res, next) => {
  const form = req.form;

  hexo.post.create(form, (err, path, content) => {
    if (err) return next(err);

    res.json({
      path: path.substring(hexo.source_dir.length),
      content
    });
  });
}];