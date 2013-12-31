var Field = require('express-form/lib/field');

exports = module.exports = function(){
  Field.apply(this, arguments);
};

exports.prototype.__proto__ = Field.prototype;

exports.prototype.split = function(separator){
  return this.add(function(value){
    if (!value) return [];
    if (Array.isArray(value)) return value;

    var arr = [];

    value.split(separator).forEach(function(item){
      arr.push(item.replace(/^\s+|\s+$/, ''));
    });

    return arr;
  });
};

exports.prototype.default = Field.prototype.ifNull;