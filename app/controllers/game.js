App.GameController = Ember.ObjectController.extend( {
	//region Properties

	startTime: moment(),

	//endregion

	//region Methods

	/**
	 *
	 * @param {Cell} cell
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
	 *
	 */
	endGame: function () {
		var winner = null,
			game = this.get( 'model' ),
			currentPlayer = game.get( 'currentPlayer' ),
			field = game.get( 'field' ),
			startTime = this.get( 'startTime' ),
			endTime = moment(),
			gameOverData = Ember.Object.create( {
				winner: null
			} );

		if ( game.hasWinner() ) {
			winner = currentPlayer;
		}

		gameOverData.set( 'winner', winner );
		this.saveHighscores( App.HighscoresItem.create( {
			date: Date.now(),
			winnerName: Ember.isEmpty( winner ) ? null : winner.get( 'name' ),
			playTime: endTime.diff( startTime )
		} ) );

		this.send( 'showModal', 'gameover-modal', gameOverData );
	},

	/**
	 *
	 * @throws Throws error inf
	 * @param {HighscoresItem} highscores
	 */
	saveHighscores: function ( highscores ) {
		var storage = App.get( 'highscoresStorage' );

		if ( Ember.isNone( highscores ) ) {
			throw '';
		}

		storage.addItem( highscores );
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
		cellClick: function ( cell ) {
			this.makeMove( cell );
		},

		playAgain: function () {
			this.get( 'model' ).start();
			this.set( 'startTime', moment() );
		},

		restartGame: function () {
			if ( confirm( 'Are you sure you want to restart the game?' ) ) {
				this.send( 'playAgain' );
			}
		},

		editName: function () {
			var playerName = this.get( 'player1.name' ),
				modalData = {
					player: this.get( 'player1' ),
					isNameRequired: Ember.isEmpty( playerName )
				};

			this.send( 'showModal', 'player-name-modal', modalData );
		}
	}

	//endregion
} );
