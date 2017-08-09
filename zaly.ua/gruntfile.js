module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      options: {
        separator: ' '
      },
        basic: {
        src: ['js/src/*.js'],
        dest: 'js/main.js',
      },
        extras: {
        src: ['css/src/*.css'],
        dest: 'css/main.css',
      }
    },

    imagemin: {
    dynamic: {
        options: {                      
          optimizationLevel: 6,          
        },
        files: [{
            expand: true,
            cwd: 'img/src/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'img/'
        }]
      }
    },

    /*sprite:{
      all: {
        src: 'img/src/*.{png,jpg}',
        dest: 'img/sprite.png',
        destCss: 'css/src/sprites.css'
      }
    },*/

    


      stylus: {
          compile: {
              options: {
                  compress: true,
                  urlfunc: 'embedurl',
                  paths: ['styl'],
              },
              files: {
                  'css/src/stylus.css': ['styl/**/*.styl']
              }
          }
      },

    watch: {
      css:{
        files: ['css/src/*.css'],
        tasks: ['concat'],
      },
      stylus: {
        files: ['styl/*.styl'],
        tasks: ['stylus', 'concat'],
      },
      js:{
        files: ['js/src/*.js'],
        tasks: ['concat'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  /*grunt.loadNpmTasks('grunt-spritesmith');*/
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  /*grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  */

  grunt.registerTask('default', ['concat','stylus'/*,'imagemin', 'uglify', 'cssmin', 'sass'*/]);
};