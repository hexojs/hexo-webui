const fs = require('graceful-fs');
const path = require('path');
const _ = require('lodash');

const randomInt = exports.randomInt = (min, max) => {
  if (max == null){
    max = min;
    min = 0;
  }

  return parseInt(Math.random() * (max - min), 10) + min;
};

const randomString = exports.randomString = (length, options) => {
  var options = _.extend({
    number: true,
    lowercase: true,
    uppercase: true
  }, options);

  let src = '';

  if (options.number) src += '0123456789';
  if (options.lowercase) src += 'abcdefghijklmnopqrstuvwxyz';
  if (options.uppercase) src += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const srcLen = src.length;
  let str = '';

  while (length--){
    str += src[randomInt(srcLen)];
  }

  return str;
};

exports.getSessionSecret = () => {
  const secretSrc = path.join(path.dirname(__dirname), '.secret');
  const exist = fs.existsSync(secretSrc);

  if (exist){
    const content = fs.readFileSync(secretSrc, 'utf8');

    if (content){
      return content;
    } else {
      fs.unlinkSync(secretSrc);
    }
  }

  const hash = randomString(32);

  fs.writeFileSync(secretSrc, hash);
  return hash;
};