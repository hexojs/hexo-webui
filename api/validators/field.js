const FormField = require('express-form/lib/field');

const Field = function(...args) {
  FormField.apply(this, args);
};

Field.prototype.__proto__ = FormField.prototype;

Field.prototype.split = function(separator){
  return this.add(value => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    const arr = [];

    value.split(separator).forEach(item => {
      arr.push(item.replace(/^\s+|\s+$/, ''));
    });

    return arr;
  });
};

Field.prototype.default = FormField.prototype.ifNull;

module.exports = (property, label) => new Field(property, label);