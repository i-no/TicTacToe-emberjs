/**
 * @module Routes
 * @class GameRoute
 */
App.GameRoute = Ember.Route.extend( {
	game: App.Game.create( {
		player1: App.Player.create( {} ),
		player2: App.Player.create( {
			name: 'Computer',
			isComputer: true
		} )
	} ),

	model: function () {
		return this.get( 'game' );
	},

	setupController: function ( controller, model ) {
		var user = model.get( 'player1' );

		this._super( controller, model );

		model.reset();

		if ( Ember.isEmpty( user.get( 'name' ) ) ) {
			controller.send( 'editName', true );
		}
		else {
			model.start();
		}
	}
} );