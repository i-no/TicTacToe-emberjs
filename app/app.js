var App = Ember.Application.create({});

Ember.Application.initializer({
	name: 'appInit',

	initialize: function( container, application ) {
		var storage = App.HighscoresStorage.create({});

		storage.load();
		application.set( 'highscoresStorage', storage );
	}
});