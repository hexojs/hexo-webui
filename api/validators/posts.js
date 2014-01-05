var form = require('express-form'),
  field = require('./field');

exports.index = form(
  field('limit').default(50).toInt(),
  field('skip').default(0).toInt(),
  field('select').array().split(','),
  field('orderby').default('date'),
  field('order').default(-1)
);

exports.show = form(
  field('id').required(),
  field('select').array().split(',')
);

exports.create = form(
  field('title').required(),
  field('layout')
);