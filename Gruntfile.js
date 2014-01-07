module.exports = function(grunt){
  grunt.initConfig({
    gitclone: {
      fontawesome: {
        options: {
          repository: 'https://github.com/FortAwesome/Font-Awesome.git',
          directory: 'tmp/fontawesome'
        }
      }
    },
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
    fontmap: {
      options: {
        src: 'tmp/fontawesome/scss/_variables.scss',
        dest: 'assets/styl/common/font.styl'
      }
    },
    watch: {
      stylus: {
        files: 'assets/styl/**/*.styl',
        tasks: ['stylus']
      }
    },
    htmlmin: {
      app: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'views/',
          src: '**/*.html',
          dest: 'public/views/'
        }]
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'tmp/fontawesome/',
        src: 'fonts/*',
        dest: 'public/css/'
      }
    },
    clean: {
      fontawesome: ['public/css/fonts', 'assets/styl/common/font.styl'],
      tmp: ['tmp'],
      views: ['public/views']
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('build/tasks');

  grunt.registerTask('fontawesome', ['clean:fontawesome', 'gitclone:fontawesome', 'copy:fontawesome', 'fontmap', 'clean:tmp']);
  grunt.registerTask('install', ['fontawesome']);
  grunt.registerTask('build', ['stylus', 'htmlmin']);
};