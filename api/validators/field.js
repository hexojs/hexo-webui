const FormField = require('express-form/lib/field');

const Field = function(...args) {
  FormField.apply(this, args);
};

Field.prototype.__proto__ = FormField.prototype;

Field.prototype.split = function(separator){
  return this.add(value => {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    return value.split(separator).map(item => item.trim());
  });
};

Field.prototype.default = FormField.prototype.ifNull;

module.exports = (property, label) => new Field(property, label);