/**
 * @module Controllers
 * @class GameResultsController
 */
App.GameResultsController = Ember.ObjectController.extend( {
	/**
	 * @property gameResults Array of game results.
	 * @type {GameResultItem[]}
	 */
	gameResults: function () {
		var storage = App.get( 'gameResultsStorage' );

		return storage.get( 'items' );
	}.property( 'App.gameResultsStorage.items' )
} );
