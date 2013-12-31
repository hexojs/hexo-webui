var fs = require('graceful-fs'),
  path = require('path'),
  _ = require('lodash');

var randomInt = exports.randomInt = function(min, max){
  if (max == null){
    max = min;
    min = 0;
  }

  return parseInt(Math.random() * (max - min), 10) + min;
};

var randomString = exports.randomString = function(length, options){
  var options = _.extend({
    number: true,
    lowercase: true,
    uppercase: true
  }, options);

  var src = '';

  if (options.number) src += '0123456789';
  if (options.lowercase) src += 'abcdefghijklmnopqrstuvwxyz';
  if (options.uppercase) src += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  var srcLen = src.length,
    str = '';

  while (length--){
    str += src[randomInt(srcLen)];
  }

  return str;
};

exports.getSessionSecret = function(){
  var secretSrc = path.join(path.dirname(__dirname), '.secret'),
    exist = fs.existsSync(secretSrc);

  if (exist){
    var content = fs.readFileSync(secretSrc, 'utf8');

    if (content){
      return content;
    } else {
      fs.unlinkSync(secretSrc);
    }
  }

  var hash = randomString(32);

  fs.writeFileSync(secretSrc, hash);
  return hash;
};