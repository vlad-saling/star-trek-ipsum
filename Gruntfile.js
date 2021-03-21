'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    sass: {
      dev: {
        options: {
          style: 'expanded',
        },
        files: {
          'src/css/style.css': 'src/css/style.scss',
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          "sourcemap=none": ''
        },
        files: {
          'docs/css/style.css': 'src/css/style.scss',
        }
      }
    },

    watch: {
      default: {
        files: ['src/**/*'],
        tasks: ['production'],
        options: {
          spawn: false,
        }
      }
    },

    //minifying app script for later concating
    uglify: {
      options: {
        //banner: BANNER
      },
      build: {
        files: {
          'src/js/the-script.min.js': ['src/js/the-script.js']
        }
      }
    },

    //merging everything together
    concat: {
      libs: {
        src: ['src/js/the-script.min.js'],
        dest: 'docs/js/app.js'
      }
    },

    processhtml: {
      prod: {
        files: {
          'docs/index.html': ['src/index.html.tmpl']
        }
      }
  },

    copy: {
      stuff: {
        expand: true,
        cwd: 'dev',
        src: 'robots.txt',
        dest: 'docs/',
      }
    },

    htmlmin: {                                    
      dist: {                                     
        options: {                               
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'docs/index.html': 'docs/index.html'   

        }
      }
    },
    
    jsonmin: {
        dev: {
            options: {
                stripWhitespace: true
            },
            files: {
                "src/content/content.json" : "src/content/content.source.json",
            }
        }
    },

    embed: {
      default: {
        options: {
          threshold: '30KB'
        },
        files: {
          'docs/index.html': 'docs/index.html'
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-jsonmin');
  grunt.loadNpmTasks('grunt-embed');

  //for my bad memory
  grunt.registerTask('production', ['sass:prod', 'uglify', 'jsonmin:dev','concat','copy','processhtml','htmlmin', 'embed']);
  grunt.registerTask('indexTemplates', ['watch:processhtml']);

};
