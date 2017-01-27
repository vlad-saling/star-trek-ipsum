'use strict';

module.exports = function(grunt) {

  // var jsApp = [
  //   'js/the-script.js',
  // ]

  // if (typeof(target) == "undefined") {
  //   grunt.fail.warn("A target must be specified using the --target=[target] option. Valid targets are \"dev\" and \"prod\".");
  // }

  

  grunt.initConfig({


    jshint: {
      dev: [
        '_dev/js/the-script.js',
      ],
      prod: [
        '_prod/js/app.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },


    sass: {
      dev: {
        options: {
          style: 'expanded',
          require: 'sass-css-importer',
        },
        files: {
          '_dev/css/style.css': '_dev/css/style.scss',
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          require: 'sass-css-importer',
          "sourcemap=none": ''
        },
        files: {
          '_prod/css/style.css': '_dev/css/style.scss',
        }
      }
    },

    watch: {
      sass: {
        files: ['_dev/css/*.scss'],
        tasks: ['production'],
        options: {
          spawn: false,
        }
      },
      processhtml: {
        files: ['_dev/index.html.tmpl'],
        tasks: ['processhtml'],
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
      img: {
        expand: true,
        cwd: '_dev',
        src: 'img/**',
        dest: '_prod/',
      },
      content: {
        expand: true,
        cwd: '_dev',
        src: 'content/content.json',
        dest: '_prod/',
      },
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
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
