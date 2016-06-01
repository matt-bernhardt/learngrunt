module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    revision: {
      options: {
        property: 'meta.revision',
        ref: 'HEAD',
        short: true
      },
      preprocess: {
        options: {
          context: {
            revision: '<%= meta.revision %>'
          }
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'release',
              replacement: '<%= meta.revision %>'
            }
          ]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['src/learngrunt.js'],
          dest: 'build/',
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-git-revision');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('release', ['revision', 'replace'])
  grunt.registerTask('default', ['release', 'uglify']);
}