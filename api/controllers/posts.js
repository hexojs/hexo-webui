const Post = hexo.model('Post');
const validators = require('../validators/posts');

exports.index = [validators.index, (req, res, next) => {
  const { form } = req;

  let data = Post
    .sort(form.orderby, form.order)
    .skip(form.skip)
    .limit(form.limit)
    .toArray();

  if (form.select && form.select.length){
    const select = Array.from(new Set(form.select));

    data = data.map(item => select.reduce((obj, key) => {
      if (item && Object.prototype.hasOwnProperty.call(item, key)) {
        obj[key] = item[key];
      }
      return obj;
    }, {}););
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
    const select = Array.from(new Set(form.select));

    data = select.reduce((obj, key) => {
      if (data && Object.prototype.hasOwnProperty.call(data, key)) {
        obj[key] = data[key];
      }
      return obj;
    }, {});
  }

  res.json(data);
}];

exports.create = [validators.create, (req, res, next) => {
  const { form } = req;

  hexo.post.create(form, (err, path, content) => {
    if (err) return next(err);

    res.json({
      path: path.substring(hexo.source_dir.length),
      content
    });
  });
}];