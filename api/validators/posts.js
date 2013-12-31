var form = require('express-form'),
  Field = require('./field');

exports.index = form(
  new Field('limit').default(50).toInt(),
  new Field('skip').default(0).toInt(),
  new Field('select').array().split(','),
  new Field('orderby').default('date'),
  new Field('order').default(-1)
);

exports.show = form(
  new Field('id').required(),
  new Field('select').array().split(',')
);