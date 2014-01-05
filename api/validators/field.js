var FormField = require('express-form/lib/field');

var Field = function(){
  FormField.apply(this, arguments);
};

Field.prototype.__proto__ = FormField.prototype;

Field.prototype.split = function(separator){
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

Field.prototype.default = FormField.prototype.ifNull;

module.exports = function(property, label){
  return new Field(property, label);
};