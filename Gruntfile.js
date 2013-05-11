module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['web.js']
      }
    },

    watch: {
      scripts: {
        files: ['<%= jshint.js.src %>'],
        tasks: ['jshint']
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'web.js',
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js'],
          watchedFolders: ['test', 'tasks'],
          debug: true,
          delayTime: 1
        }
      }
    },

    concurrent: {
      server: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    exec: {
      deploy: {
        cmd: function() {
          var shell = require("shelljs"),
            packageJson = require('./package.json'),
            remoteRepoName = "heroku",
            remoteRepoLoc = packageJson.deploymentRemote;

          // Add remote repository if not already added
          var out = shell.exec("git remote | grep '^" + remoteRepoName + "$'", {silent:true}).output;
          if (out.length <= 0) {
            console.log("Adding remote '" + remoteRepoName + "': " + remoteRepoLoc);
            shell.exec("git remote add " + remoteRepoName + " " + remoteRepoLoc);
          }

          return "git push heroku master";
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['concurrent:server']);
  grunt.registerTask('deploy', ['exec:deploy']);
};