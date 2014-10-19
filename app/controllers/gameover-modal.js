/**
 * @module Controllers
 * @class GameoverModalController
 */
App.GameoverModalController = Ember.ObjectController.extend( {
	/**
	 * Controller dependencies.
	 */
	needs: [ 'game' ],

	/**
	 * @property gameoverStatus
	 * @type {string}
	 */
	gameoverStatus: function () {
		var winner = this.get( 'model.winner' );

		if ( Ember.isNone( winner ) ) return 'draw';

		if ( winner.get( 'isComputer' ) ) {
			return 'lose';
		}
		else return 'win';
	}.property( 'model.winner' ),

	/**
	 * @property gameoverText
	 * @type {string}
	 */
	gameoverText: function () {
		var status = this.get( 'gameoverStatus' );

		switch ( status ) {
			case 'win':
				return 'You win!';
			case 'lose':
				return 'You lose!';
			case 'draw':
				return 'Draw'
		}

		return '';
	}.property( 'gameoverStatus' ),

	modalButtons: [
		{
			title: 'Play again',
			action: 'playAgain',
			style: 'btn-success',
			closeModal: true
		},

		{
			title: 'To main page',
			action: 'toMainPage',
			style: 'btn-default',
			closeModal: true
		}
	],

	actions: {
		playAgain: function () {
			this.get( 'controllers.game' ).send( 'playAgain' );
		},

		toMainPage: function () {
			this.transitionToRoute( 'index' );
		}
	}
} );
