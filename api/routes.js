module.exports = function(app){
  var renderApp = function(req, res, next){
    res.render('app');
  };

  app.namespace('api', function(api){
    api.resources('posts', {controller: 'posts', except: ['new', 'edit']}, function(posts){
      posts.get('preview');
    });
  });

  app.get('/', renderApp);
  app.get('posts', renderApp);
  app.get('posts/new', renderApp);
  app.get('posts/:id/edit', renderApp);
};