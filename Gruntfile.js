'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
   
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'app.js'
      }
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('travis', ['jshint']);

};
