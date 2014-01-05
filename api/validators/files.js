var form = require('express-form'),
  field = require('./field');

exports.show = form(
  field('path'),
  field('raw').toBoolean(),
  field('download').toBoolean(),
  field('content').toBoolean(),
  field('hidden').default(false).toBoolean()
);

exports.save = form(
  field('path'),
  field('folder').default(false).toBoolean(),
  field('move'),
  field('rename')
);

exports.destroy = form(
  field('path')
);