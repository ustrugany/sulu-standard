/**
 * Created by piotras on 06.02.16.
 */
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ["dist/css"]
        },
        files: {
          "dist/css/style.css": "src/less/style.less"
        }
      },
      production: {
        options: {
          paths: ["dist/css"],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            //new (require('less-plugin-clean-css'))(cleanCssOptions)
          ],
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }
        },
        files: {
          "dist/css/style.css": "src/less/style.less"
        }
      }
    },
    // Images optimisation
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'dist/images'
        }]
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'src/styles',
        cssDir: 'dist/css',
        generatedImagesDir: 'dist/images/generated',
        imagesDir: 'src/images',
        javascriptsDir: 'src/scripts',
        fontsDir: 'src/styles/fonts',
        //importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: 'dist/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },
    watch: {
      compass: {
        files: ['src/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      //less
      //styles: {
      //  files: ['src/less/**/*.less'], // which files to watch
      //  tasks: ['less'],
      //  options: {
      //    nospawn: true
      //  }
      //}
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['compass:dist', 'imagemin']);
};