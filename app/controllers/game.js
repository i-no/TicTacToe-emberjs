/**
 * @module Controllers
 * @class GameController
 *
 * @requires GameController
 */
App.GameController = Ember.ObjectController.extend( {
	//region Methods

	/**
	 * Set a mark of current player in a field cell and check that game is over or not. If game is not over,
	 * then turn goes to the next playes. Otherwise we end the game and save game result.
	 *
	 * @method makeMove
	 * @param {Cell} cell Field cell to set a mark.
	 */
	makeMove: function ( cell ) {
		var game = this.get( 'model' ),
			player = game.get( 'currentPlayer' );

		if ( !( cell instanceof App.Cell ) ) return;

		if ( cell.get( 'isEmpty' ) ) {
			cell.set( 'value', player.get( 'mark' ) );

			if ( game.isGameOver() ) {
				this.endGame();
			}
			else {
				game.set( 'currentPlayer', game.nextPlayer() );
			}
		}
	},

	/**
	 * Generate game result data, save it and open game over modal dialog.
	 *
	 * @method endGame
	 */
	endGame: function () {
		var winner = null,
			game = this.get( 'model' ),
			currentPlayer = game.get( 'currentPlayer' ),
			field = game.get( 'field' ),
			startTime = game.get( 'startTime' ),
			endTime = moment(),
			gameOverData = Ember.Object.create( {
				winner: null
			} );

		if ( game.hasWinner() ) {
			winner = currentPlayer;
		}

		gameOverData.set( 'winner', winner );
		this.saveGameResult( App.GameResultItem.create( {
			date: Date.now(),
			winnerName: Ember.isEmpty( winner ) ? null : winner.get( 'name' ),
			playTime: endTime.diff( startTime )
		} ) );

		this.send( 'showModal', 'gameover-modal', gameOverData );
	},

	/**
	 * Save game result in storage.
	 *
	 * @method saveGameResult
	 * @throws Throws error if <tt>gameResult</tt> parameter is empty.
	 * @param {GameResultItem} gameResult
	 */
	saveGameResult: function ( gameResult ) {
		var storage = App.get( 'gameResultsStorage' );

		if ( Ember.isNone( gameResult ) ) {
			throw 'Parameter "gameResult" should not be empty.';
		}

		storage.addItem( gameResult );
	},

	//endregion

	//region Observers

	/**
	 * Observes currentPlayer field state. If current player is computer player, then select any empty field cell
	 * and make a move.
	 */
	didCurrentPlayerChange: function () {
		var currentPlayer = this.get( 'model.currentPlayer' ),
			computerPlayer = this.get( 'model.player2' ),
			field = this.get( 'model.field' ),
			emptyCells = field.getEmptyCells();

		//if it's computer player turn
		if ( Ember.isEqual( currentPlayer, computerPlayer ) ) {
			//select empty cell and make move
			this.makeMove( emptyCells[ Math.floor( Math.random() * emptyCells.length ) ] );
		}
	}.observes( 'model.currentPlayer' ),

	//endregion

	//region Actions

	actions: {
		/**
		 * Fired when user click a field cell.
		 *
		 * @event cellClick
		 * @param {Cell} cell Cell that was clicked.
		 */
		cellClick: function ( cell ) {
			this.makeMove( cell );
		},

		/**
		 * Fired when we need to restart the game.
		 *
		 * @event playAgain
		 */
		playAgain: function () {
			var game = this.get( 'model' );

			game.reset();
			game.start();
		},

		/**
		 * Fired when user click "Restart game" button
		 *
		 * @event restartGame
		 */
		restartGame: function () {
			if ( confirm( 'Are you sure you want to restart the game?' ) ) {
				this.send( 'playAgain' );
			}
		},

		/**
		 * Fired when user click "Edit name" button.
		 *
		 * @event editName
		 */
		editName: function () {
			var playerName = this.get( 'player1.name' ),
				modalData = {
					player: this.get( 'player1' ),
					isNameRequired: Ember.isEmpty( playerName )
				};

			this.send( 'showModal', 'player-name-modal', modalData );
		},
		playerNameModalClosed: function() {
			var game = this.get( 'model' );

			if ( Ember.isNone( game.get( 'startTime') ) ) {
				game.start();
			}
		}
	}

	//endregion
} );
