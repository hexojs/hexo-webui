var path = require('path'),
  _ = require('lodash');

module.exports = function(grunt){
  // Read asset config
  var assets = grunt.file.readYAML(path.join(__dirname, 'assets', 'assets.yml'));

  // Generate Stylus tasks
  var stylusTasks = {
    options: {
      import: ['assets/styl/_variables']
    }
  };

  _.each(assets.css, function(data, i){
    stylusTasks['public/css/' + i + '.css'] = _.map(data, function(item){
      return 'assets/styl/' + item;
    });
  });

  grunt.initConfig({
    stylus: stylusTasks,
    watch: {
      stylus: {
        files: 'assets/styl/**/*.styl',
        tasks: ['stylus']
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('build/tasks');

  grunt.registerTask('build', ['stylus']);
};