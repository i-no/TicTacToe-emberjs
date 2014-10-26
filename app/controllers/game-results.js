/**
 * @module Controllers
 * @class GameResultsController
 */
App.GameResultsController = Ember.ObjectController.extend( {
	gameResults: function () {
		var storage = App.get( 'gameResultsStorage' );

		return storage.get( 'items' );
	}.property( 'App.gameResultsStorage.items' )
} );
