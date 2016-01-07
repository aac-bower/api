module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      './bower_components/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',

                './src/app/**/*.module.js',        // first all the module definitions
                './src/app/**/*.!(module).js',     // after that all the module components
                './src/app/**/*.js'                // after that all non-module files
    ],

    exclude: [
    ],

    preprocessors: {
      './src/**/*.html': ['ng-html2js'],
      './src/**/!(*.mock|*.spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'src/',
      // create a single module that contains templates from all the files
      moduleName: 'templates'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      // output coverage reports
      dir : 'coverage/'
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
        'PhantomJS'
        // 'Chrome'
    ],

    singleRun: true
  });
};