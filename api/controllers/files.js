var fs = require('graceful-fs'),
  pathFn = require('path'),
  async = require('async'),
  _ = require('lodash'),
  mime = require('mime'),
  file = hexo.util.file2,
  validators = require('../validators/files');

var sourceDir = hexo.source_dir.replace(/[\/\\]$/, ''),
  rHidden = /^\./;

var isStartWith = function(str, first){
  return str.substring(0, first.length) === first;
};

var filterPath = function(req, res, next){
  var fullPath = req.fullPath = pathFn.join(sourceDir, req.form.path || req.params[0]);

  if (isStartWith(fullPath, sourceDir)){
    next();
  } else {
    res.send(403);
  }
};

var fileInfo = function(path, stats){
  var isDir = stats.isDirectory();

  return {
    name: pathFn.basename(path),
    path: path.substring(sourceDir.length + 1),
    date: stats.ctime.toISOString(),
    updated: stats.mtime.toISOString(),
    size: isDir ? 0 : stats.size,
    type: isDir ? 'directory' : mime.lookup(path),
    is_dir: isDir
  }
};

var readdir = function(path, stats, hidden, callback){
  fs.readdir(path, function(err, files){
    if (err) return callback(err);

    var data = fileInfo(path, stats),
      entry = data.entry = [];

    files = files.sort();

    async.each(files, function(i, next){
      if (!hidden && rHidden.test(i)) return next();

      var childPath = pathFn.join(path, i);

      fs.stat(childPath, function(err, stats){
        if (err) return next(err);

        entry.push(fileInfo(childPath, stats));
        next();
      });
    }, function(err){
      if (err) return callback(err);

      entry = _.sortBy(entry, 'name');
      callback(null, data);
    });
  });
};

exports.show = [validators.show, filterPath, function(req, res, next){
  var fullPath = req.fullPath,
    form = req.form;

  async.auto({
    exist: function(next){
      fs.exists(fullPath, function(exist){
        if (exist){
          next();
        } else {
          res.send(404);
        }
      });
    },
    stats: ['exist', function(next){
      fs.stat(fullPath, next);
    }],
    data: ['stats', function(next, results){
      var stats = results.stats;

      if (stats.isDirectory()){
        readdir(fullPath, stats, form.hidden, next);
      } else if (form.raw || form.download){
        next();
      } else {
        next(null, fileInfo(fullPath, stats));
      }
    }],
    content: ['exist', function(next){
      if (!form.content) return next();

      file.readFile(fullPath, next);
    }],
    response: ['stats', 'data', 'content', function(next, results){
      var stats = results.stats,
        data = results.data,
        content = results.content;

      if (form.raw){
        res.sendfile(fullPath);
      } else if (form.download){
        res.download(fullPath);
      } else {
        if (form.content){
          data.content = content;
        }

        res.json(data);
      }
    }]
  }, next);
}];

exports.save = [validators.save, filterPath, function(req, res, next){
  //
}];

exports.destroy = [validators.destroy, filterPath, function(req, res, next){
  //
}];