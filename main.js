require.config({
  baseUrl: '/build/js',

  paths: {
    app: 'app',
	templates: 'templates.min',
    jquery: '/libs/vendor/jquery/dist/jquery.min',
    ember: '/libs/vendor/ember/ember.min',
    handlebars: '/libs/vendor/handlebars/handlebars.min',
	moment: '/libs/vendor/moment/min/moment.min',
	bootstrap: '/libs/vendor/bootstrap/dist/js/bootstrap.min'
  },

  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
    'ember': {
      deps: [ 'jquery', 'handlebars' ],
      exports: 'Ember'
    },
	'bootstrap': [ 'jquery' ],
	'templates': [ 'ember' ],
    'app': [ 'ember', 'templates', 'moment', 'bootstrap' ]
  }
});

define( [ 'app' ], function( ) {
  App.initialize();
} );