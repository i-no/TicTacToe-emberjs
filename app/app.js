var App = Ember.Application.create( {} );

Ember.Application.initializer( {
	name: 'appInit',

	initialize: function ( container, application ) {
		var storage = App.GameResultStorage.create( {} );

		storage.load();
		application.set( 'gameResultsStorage', storage );
	}
} );