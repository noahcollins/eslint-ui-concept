
/*global module:false*/
module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // start a node server
    connect: {
      preview: {
        options: {
          port: 9000,
          base: 'preview'
        }
      },
      production: {
        options: {
          port: 9001,
          keepalive: true,
          base: 'production'
        }
      }
    },

    clean: {
      preview: {
        src: 'preview/'
      },
      pre: {
        src: 'production/'
      },
      post: {
        src: [
          'production/styles/*.less'
        ]
      }
    },

    less: {
      preview: {
        files: {
          'preview/styles/main.css': ['source/styles/bootstrap.less', 'source/styles/bootstrap_variables.less']
        }
      },
      production: {
        options: {
          cleancss: true,
          report: 'min',
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: 'production/styles/main.css.map'
        },
        files: {
          'production/styles/main.css': ['source/styles/bootstrap.less', 'source/styles/bootstrap_variables.less']
        }
      }
    },

    copy: {
      preview: {
        files: [
          {expand: true, cwd: 'source/', src: ['img/**'], dest: 'preview/'},
          {expand: true, cwd: 'source/', src: ['js/**'], dest: 'preview/'},
          {expand: true, cwd: 'source/', src: ['*.html'], dest: 'preview/'}
        ]
      },
      production: {
        files: [
          {expand: true, cwd: 'source/', src: ['**'], dest: 'production/'},
          {expand: true, flatten: true, cwd: 'source/', src: ['styles/fonts/**'], dest: 'production/fonts/', filter: 'isFile'}
        ]
      }
    },

    // get the scripts inside the html files
    'useminPrepare': {
      html: [
        'production/*.html'
      ],
      options: {
        dest: 'production',
        root: 'production'
      }
    },

    // update the scripts links to point to the concatenated and minified js/main.js
    usemin: {
      html: [
        'production/*.html'
      ],
      options: {
        // this is necessary so that usemin can find the revved css and js files
        assetsDirs: ['production']
      }
    },

    filerev: {
      files: {
        src: [
          'production/js/main.js',
          'production/styles/main.css'
        ]
      }
    },

    // watch: {
    //   preview: {
    //     files: 'source/**',
    //     tasks: ['refresh_preview'],
    //     options: {
    //       debounceDelay: 250,
    //       livereload: true,
    //       spawn: false
    //     },
    //   },
    // },

    watch: {
      styles: {
        files: 'source/styles/*.less',
        tasks: ['refresh_styles'],
        options: {
          debounceDelay: 250,
          livereload: true,
          spawn: false
        },
      },
      js: {
        files: 'source/js/**',
        tasks: ['refresh_js'],
        options: {
          debounceDelay: 250,
          livereload: true,
          spawn: false
        },
      },
      // img: {
      //   files: 'source/img/**',
      //   tasks: ['refresh_preview'],
      //   options: {
      //     debounceDelay: 250,
      //     livereload: true,
      //     spawn: false
      //   },
      // },
      // templates: {
      //   files: 'source/templates/**',
      //   tasks: ['refresh_preview'],
      //   options: {
      //     debounceDelay: 250,
      //     livereload: true,
      //     spawn: false
      //   },
      // },
      // data: {
      //   files: 'source/data/**',
      //   tasks: ['refresh_preview'],
      //   options: {
      //     debounceDelay: 250,
      //     livereload: true,
      //     spawn: false
      //   },
      // },
      // this matches any files in root dir like .htaccess, robots.txt, etc
      everything_else: {
        files: 'source/!(css|js)/**',
        tasks: ['refresh_preview'],
        options: {
          debounceDelay: 250,
          livereload: true,
          spawn: false
        },
      },
    },

    // uglify: {
    //   target: {
    //     files: {
    //       'production/main.js': 'production/main.js'
    //     }
    //   }
    // },

    jshint: {
      all: [
        'Gruntfile.js',
        'source/js/app/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    // modernizr: {
    //   "devFile" : "remote",
    //   "outputFile" : "source/js/vendor/modernizr_custom.js",
    //   // add feature tests here
    //   "extra" : {
    //     "shiv" : true,
    //     "load" : true,
    //     "cssclasses" : true,
    //     "cssanimations": true
    //   },
    //   "uglify" : true,
    //   "parseFiles" : false
    // },

    // favicons: {
    //   options: {
    //     trueColor: true,
    //     precomposed: true,
    //     appleTouchBackgroundColor: "#e2b2c2",
    //     coast: true,
    //     windowsTile: true,
    //     tileBlackWhite: false,
    //     tileColor: 'auto',
    //     html: 'production/index.html',
    //     HTMLPrefix: '/img/icons/'
    //   },
    //   icons: {
    //     src: 'source/img/favicon.512x512.png',
    //     dest: 'production/img/icons'
    //   }
    // },

    svgmin: {
      production: {
        options: {
          plugins: [{
            removeViewBox: false
          }]
        },
        // minify and overwrite svg files in /production/img/
        files: [{
          expand: true,
          cwd: 'production/img/',
          src: ['**/*.svg'],
          dest: 'production/img/'
        }]
      }
    },

    imagemin: {
      production: {
        files: [{
          expand: true,
          cwd: 'production/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'production/img/'
        }]
      }
    }

  });

  // discussion @ https://github.com/gruntjs/grunt/issues/975
  //
  // JSHINT
  grunt.registerTask('jshint', [], function () {

    // load plugins for jshint task
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // execute the task
    grunt.task.run(
      'jshint'
    );

  });
  // END JSHINT

  // DEVELOPMENT
  //
  // preview the site during development
  grunt.registerTask('preview', [], function () {

    // load plugins for preview task
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // execute the task
    grunt.task.run(
      'jshint',
      'clean:preview',
      'copy:preview',
      'less:preview',
      'connect:preview',
      'watch'
    );

  });
  // end preview the site during development

  // refresh preview site when files change
  // necessary tasks are still loaded because of running grunt process (watch), so no need to load plugins
  grunt.registerTask('refresh_styles', [
    'less:preview'
  ]);
  grunt.registerTask('refresh_js', [
    'jshint',
    'copy:preview'
  ]);
  grunt.registerTask('refresh_preview', [
    'copy:preview'
  ]);
  // end refresh preview site when files change
  //
  // END DEVELOPEMENT

  // PRODUCTION
  //
  // optimize the site for deployment
  grunt.registerTask('production', [], function () {

    // load plugins for the 'production' task
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-svgmin');
    // grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // execute the task
    grunt.task.run(
      'jshint',
      'clean:pre',
      'copy:production',
      'less:production',
      'useminPrepare',
      'svgmin',
      // 'favicons',
      // 'uglify',
      'filerev',
      'usemin',
      'imagemin',
      'clean:post',
      'connect:production'
    );

  });
  // END PRODUCTION

};