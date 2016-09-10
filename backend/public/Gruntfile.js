module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options:{
          style:'compressed',
          sourcemap: 'none'
        },
        files: {
          'stylesheets/app.css' : 'scss/base.scss'
        }
      }
    },
    autoprefixer:{
      dist:{
        files:{
          'stylesheets/app.css':'stylesheets/app.css'
        }
      }
    },
    watch: {
      css: {
        files: 'scss/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default',['watch']);
}
