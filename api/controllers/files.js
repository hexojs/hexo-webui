const fs = require('graceful-fs');
const pathFn = require('path');
const async = require('async');
const _ = require('lodash');
const mime = require('mime');
const file = hexo.util.file2;
const validators = require('../validators/files');
const sourceDir = hexo.source_dir.replace(/[\/\\]$/, '');
const rHidden = /^\./;

const filterPath = (req, res, next) => {
  const fullPath = req.fullPath = pathFn.join(sourceDir, req.form.path || req.params[0]);

  if (fullPath.startsWith(sourceDir)){
    next();
  } else {
    res.send(403);
  }
};

const fileInfo = (path, stats) => {
  const isDir = stats.isDirectory();

  return {
    name: pathFn.basename(path),
    path: path.substring(sourceDir.length + 1),
    date: stats.ctime.toISOString(),
    updated: stats.mtime.toISOString(),
    size: isDir ? 0 : stats.size,
    type: isDir ? 'directory' : mime.getType(path),
    is_dir: isDir
  }
};

const readdir = (path, stats, hidden, callback) => {
  fs.readdir(path, (err, files) => {
    if (err) return callback(err);

    const data = fileInfo(path, stats);
    let entry = data.entry = [];

    files = files.sort();

    async.each(files, (i, next) => {
      if (!hidden && rHidden.test(i)) return next();

      const childPath = pathFn.join(path, i);

      fs.stat(childPath, (err, stats) => {
        if (err) return next(err);

        entry.push(fileInfo(childPath, stats));
        next();
      });
    }, err => {
      if (err) return callback(err);

      entry = _.sortBy(entry, 'name');
      callback(null, data);
    });
  });
};

exports.show = [validators.show, filterPath, (req, res, next) => {
  const { fullPath, form } = req;

  async.auto({
    exist(next) {
      fs.exists(fullPath, exist => {
        if (exist){
          next();
        } else {
          res.send(404);
        }
      });
    },
    stats: ['exist', next => {
      fs.stat(fullPath, next);
    }],
    data: ['stats', (next, results) => {
      const stats = results.stats;

      if (stats.isDirectory()){
        readdir(fullPath, stats, form.hidden, next);
      } else if (form.raw || form.download){
        next();
      } else {
        next(null, fileInfo(fullPath, stats));
      }
    }],
    content: ['exist', next => {
      if (!form.content) return next();

      file.readFile(fullPath, next);
    }],
    response: ['stats', 'data', 'content', (next, results) => {
      const { stats, data, content } = results;

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

exports.save = [validators.save, filterPath, (req, res, next) => {
  //
}];

exports.destroy = [validators.destroy, filterPath, (req, res, next) => {
  //
}];