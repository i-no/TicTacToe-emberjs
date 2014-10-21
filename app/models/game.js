/**
 * @module Models
 * @class Game
 */
App.Game = Ember.Object.extend( {

	//region Properties

	/**
	 * First player.
	 *
	 * @property player1
	 * @type {Player}
	 */
	player1: null,

	/**
	 * Second player.
	 *
	 * @property player2
	 * @type {Player}
	 */
	player2: null,

	/**
	 * Player, who makes turn now.
	 *
	 * @property currentPlayer
	 * @type {Player}
	 */
	currentPlayer: null,

	/**
	 * Game field.
	 *
	 * @property field
	 * @type {Field}
	 */
	field: App.Field.create( {} ),

	/**
	 * Number of marks of the same type that should be placed in a horizontal, vertical, or diagonal row to win the game.
	 *
	 * @property marksToWin
	 * @type {number}
	 * @default 4
	 */
	marksToWin: 4,

	//endregion

	//region Methods

	/**
	 * Check array to find marksToWin marks in a row.
	 *
	 * @method checkArray
	 * @param {Cell[]} data Array of field cells.
	 * @return {boolean} Returns <tt>true</tt> if there are {{#crossLink "Game/marksToWin:property"}}{{/crossLink}} marks of the same type in a row. Otherwise returns <tt>false</tt>.
	 */
	checkArray: function ( data ) {
		var prevValue = null,
			count = 0,
			marksToWin = this.get( 'marksToWin' );

		for ( var i = 0; i < data.length; i++ ) {
			if ( data[ i ].get( 'isEmpty' ) ) {
				count = 0;
				prevValue = null;
			}
			else {
				if ( count === 0 ) {
					prevValue = data[ i ].get( 'value' );
				}

				if ( prevValue === data[ i ].get( 'value' ) ) {
					count += 1;
				}
				else {
					count = 1;
					prevValue = data[ i ].get( 'value' );
				}
			}

			if ( count >= marksToWin ) {
				console.log( data );
				return true;
			}
		}

		return false;
	},

	/**
	 * Check that game has a winner.
	 *
	 * @method hasWinner
	 * @return {boolean} Returns <tt>true</tt> if we have a winner in the game. Otherwise returns <tt>false</tt>.
	 */
	hasWinner: function () {
		var field = this.get( 'field' ),
			fieldSize = field.get( 'size' ),
			marksToWin = this.get( 'marksToWin' ),
			diagonals = field.getDiagonals( marksToWin );

		//check rows and columns
		for ( var i = 0; i < fieldSize; i++ ) {
			if ( this.checkArray( field.getRow( i ) ) ) return true;
			if ( this.checkArray( field.getColumn( i ) ) ) return true;
		}

		//check diagonals
		if ( !Ember.isEmpty( diagonals ) ) {
			for ( i = 0; i < diagonals.length; i++ ) {
				if ( this.checkArray( diagonals[ i ] ) ) return true;
			}
		}

		return false;
	},

	/**
	 * Check that game is over.
	 *
	 * @method isGameOver
	 * @return {boolean} Returns <tt>true</tt> if we have a winner or if there are no empty cells.
	 * Otherwise returns <tt>false</tt>.
	 */
	isGameOver: function () {
		var field = this.get( 'field' ),
			emptyCells = field.getEmptyCells();

		return this.hasWinner() || emptyCells.length === 0;
	},

	/**
	 * Initializes game. This method clears game field and selects a player who plays first.
	 *
	 * @method start
	 */
	start: function () {
		var players = [ this.get( 'player1' ), this.get( 'player2' ) ],
			field = this.get( 'field' ),
			index = Math.round( Math.random() ), //select who plays first
			currentPlayer = players[ index ];

		field.clear();

		currentPlayer.set( 'mark', 'X' );
		players[ index === 0 ? 1 : 0 ].set( 'mark', 'O' );

		this.set( 'currentPlayer', currentPlayer );
	},

	/**
	 * Returns player for the next turn.
	 *
	 * @method nextPlayer
	 * @return {Player} Returns player who turn is next.
	 */
	nextPlayer: function () {
		var player1 = this.get( 'player1' ),
			player2 = this.get( 'player2' ),
			currentPlayer = this.get( 'currentPlayer' );

		if ( Ember.isEqual( currentPlayer, player1 ) ) {
			return player2;
		}
		else {
			return player1;
		}
	}

	//endregion
} );
