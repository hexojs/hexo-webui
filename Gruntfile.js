var path = require('path'),
  _ = require('lodash');

module.exports = function(grunt){
  grunt.initConfig({
    stylus: {
      options: {
        compress: false
      },
      app: {
        files: {
          'assets/css/app.css': 'assets/styl/app.styl'
        }
      }
    },
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