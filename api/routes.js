module.exports = app => {
  app.namespace('api', api => {
    api.resources('posts', {controller: 'posts', only: ['index', 'show', 'create']});

    api.namespace('files', files => {
      files.get('*', 'files#show');
      files.post('*', 'files#save');
      files.delete('*', 'files#destroy');
    });

    api.resources('scaffolds', {controller: 'scaffolds', except: ['new', 'edit']});

    api.get('files', 'files#show');
    api.post('files', 'files#save');
    api.delete('files', 'files#destroy');
    api.get('preview', 'common#preview');
  });

  app.get('/', 'common#app');
  app.get('list/*', 'common#app');
  app.get('show/*', 'common#app');
  app.get('edit/*', 'common#app');
  app.get('posts', 'common#app');
  app.get('posts/:page', 'common#app');
};