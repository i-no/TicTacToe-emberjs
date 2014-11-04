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

	/**
	 * @property startTime
	 * @type {Moment|null}
	 */
	startTime: null,

	//endregion

	//region Methods

	/**
	 * Check array to find marksToWin marks in a row.
	 *
	 * @method checkForWinner
	 * @param {Cell[]} cells Array of field cells.
	 * @return {Cell[]|null} Check array if there are {{#crossLink "Game/marksToWin:property"}}{{/crossLink}}
	 * marks of the same type in a row and return array of cells with this marks. If there are no marks of the
	 * same type in a row then return <tt>null</tt>.
	 */
	checkForWinner: function ( cells ) {
		var prevValue = null,
			count = 0,
			cellsWithMarks = [],
			marksToWin = this.get( 'marksToWin' );

		for ( var i = 0; i < cells.length; i++ ) {
			if ( cells[ i ].get( 'isEmpty' ) ) {
				count = 0;
				prevValue = null;
				cellsWithMarks = [];
			}
			else {
				if ( count === 0 ) {
					prevValue = cells[ i ].get( 'value' );
				}

				if ( prevValue === cells[ i ].get( 'value' ) ) {
					count += 1;
					cellsWithMarks.push( cells[ i ] );
				}
				else {
					count = 1;
					prevValue = cells[ i ].get( 'value' );
					cellsWithMarks.push( cells[ i ] );
				}
			}

			if ( count >= marksToWin ) {
				return cellsWithMarks;
			}
		}

		return null;
	},

	/**
	 * Check that game has a winner and return array cells with winning combination of marks.
	 *
	 * @method findWinnerCells
	 * @return {Cell[]|null} Returns array of cells with winning combination of marks if we have a winner in the game.
	 * Otherwise returns <tt>null</tt>.
	 */
	findWinnerCells: function () {
		var field = this.get( 'field' ),
			fieldSize = field.get( 'size' ),
			marksToWin = this.get( 'marksToWin' ),
			winnerCells = [],
			diagonals = field.getDiagonals( marksToWin );

		//check rows and columns
		for ( var i = 0; i < fieldSize; i++ ) {
			winnerCells = this.checkForWinner( field.getRow( i ) ) || this.checkForWinner( field.getColumn( i ) );

			if ( !Ember.isEmpty( winnerCells ) ) {
				return winnerCells;
			}
		}

		//check diagonals
		if ( !Ember.isEmpty( diagonals ) ) {
			for ( i = 0; i < diagonals.length; i++ ) {
				winnerCells = this.checkForWinner( diagonals[ i ] );

				if ( !Ember.isEmpty( winnerCells ) ) {
					return winnerCells;
				}
			}
		}

		return null;
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
			emptyCells = field.getEmptyCells(),
			winnerCells = this.findWinnerCells();

		return !Ember.isEmpty( winnerCells ) || emptyCells.length === 0;
	},

	/**
	 * Initializes game. This method selects a player who plays first and init game timer.
	 *
	 * @method start
	 */
	start: function () {
		var players = [ this.get( 'player1' ), this.get( 'player2' ) ],
			index = Math.round( Math.random() ), //select who plays first
			currentPlayer = players[ index ];

		currentPlayer.set( 'mark', 'X' );
		players[ index === 0 ? 1 : 0 ].set( 'mark', 'O' );

		this.set( 'currentPlayer', currentPlayer );
		this.set( 'startTime', moment() );
	},

	/**
	 * Clear game field and reset {{#crossLink "Game/currentPlayer:property"}}currentPlayer{{/crossLink}} and
	 * {{#crossLink "Game/startTime:property"}}startTime{{/crossLink}} properties.
	 *
	 * @method reset
	 */
	reset: function() {
		var field = this.get( 'field' );

		field.clear();
		this.set( 'currentPlayer', null );
		this.set( 'startTime', null );
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
