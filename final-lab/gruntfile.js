module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ' '
      },
        basic: {
        src: ['js/src/*.js'],
        dest: 'js/dist/main.js',
      },
        extras: {
        src: ['css/src/*.css'],
        dest: 'css/dist/main.css',
      }
    },
    uglify: {
      my_target: {
        files: {
        'js/dist/output.min.js': 'js/dist/main.js',
      }
    }
  },
    cssmin: {
      target: {
        files: {
        'styles/dist/main.min.css': 'styles/dist/main.css',
        'styles/dist/mainIE.min.css': 'styles/dist/styleIE8.css'
      }
    }
  },
    sass: {
    dist: {
      files: [{
        expand: true,
        cwd: 'styles',  //folder
        src: ['*.scss'],
        dest: 'styles',  //folder with css
        ext: '.css'
      }]
    }
  },
    watch: {
    sass: {
      // We watch and compile sass files as normal but don't live reload here
      files: ['styles/*.scss'],
      tasks: ['sass'],
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'sass']);
};