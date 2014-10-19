App.Game = Ember.Object.extend({

    //region Properties

    /**
     * User player.
     * @type {Player}
     */
	player1: null,

    /**
     * Computer player.
     * type {Player}
     */
	player2: null,

    /**
     * Player, who makes turn now.
     * @type {Player}
     */
	currentPlayer: null,

    /**
     * Game field.
     * @type {Field}
     */
	field: App.Field.create( {} ),

	itemsToWin: 4,

    //endregion

    //region Methods

    /**
     *
     * @param {Array.<Cell>} data
     * @return {boolean}
     */
	checkArray: function( data ) {
		var prevValue = null,
			count = 0,
			itemsToWin = this.get( 'itemsToWin' );

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

			if ( count >= itemsToWin ) {
				console.log( data );
				return true;
			}
		}

		return false;
	},

    /**
     * Check that game has a winner.
     * @return {boolean} - Returns true
     */
	hasWinner: function() {
		var field = this.get( 'field' ),
			fieldSize = field.get( 'size' ),
			itemsToWin = this.get( 'itemsToWin' ),
			diagonals = field.getDiagonals( itemsToWin );

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
     * @return {boolean} Returns true if we have a winner or if there are no empty cells. Otherwise returns false.
     */
	isGameOver: function() {
		var field = this.get( 'field' ),
			emptyCells = field.getEmptyCells();

		return this.hasWinner() || emptyCells.length === 0;
	},

    /**
     * Initializes game. This method clears game field and selects a player who plays first.
     */
	start: function() {
		var players = [ this.get( 'player1' ), this.get( 'player2') ],
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
     * @return {Player}
     */
	nextPlayer: function() {
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
});
