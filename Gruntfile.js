'use strict';

module.exports = function(grunt) {

  

  grunt.initConfig({


    sass: {
      dev: {
        options: {
          style: 'expanded',
        },
        files: {
          '_dev/css/style.css': '_dev/css/style.scss',
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          "sourcemap=none": ''
        },
        files: {
          '_prod/css/style.css': '_dev/css/style.scss',
        }
      }
    },

    watch: {
      default: {
        files: ['_dev/**/*'],
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
          '_dev/js/the-script.min.js': ['_dev/js/the-script.js']
        }
      }
    },

    //merging everything together
    concat: {
      libs: {
        src: ['_dev/js/the-script.min.js'],
        dest: '_prod/js/app.js'
      }
    },


    processhtml: {
      dev: {
        files: {
          '_dev/index.html': ['_dev/index.html.tmpl']
        }
      },
      prod: {
        files: {
          '_prod/index.html': ['_dev/index.html.tmpl']
        }
      }
  },



    copy: {
      stuff: {
        expand: true,
        cwd: '_dev',
        src: 'robots.txt',
        dest: '_prod/',
      }
    },

    

    htmlmin: {                                    
      dist: {                                     
        options: {                               
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          '_prod/index.html': '_prod/index.html'   

        }
      }
    },
    
    jsonmin: {
        dev: {
            options: {
                stripWhitespace: true
            },
            files: {
                "_dev/content/content.json" : "_dev/content/content.source.json",
            }
        }
    },

    embed: {
      default: {
        options: {
          threshold: '30KB'
        },
        files: {
          '_prod/index.html': '_prod/index.html'
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
