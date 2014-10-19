App.GameRoute = Ember.Route.extend( {
	game: App.Game.create( {
		player1: App.Player.create( {} ),
		player2: App.Player.create( {
			name: 'Computer',
			isComputer: true
		} )
	} ),

	model: function () {
		var game = this.get( 'game' );

		game.start();

		return game;
	},

	setupController: function ( controller, model ) {
		var user = model.get( 'player1' );

		this._super( controller, model );

		if ( Ember.isEmpty( user.get( 'name' ) ) ) {
			controller.send( 'editName', true );
		}

		controller.set( 'startTime', new Date() );
	}
} );