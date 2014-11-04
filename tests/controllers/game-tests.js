describe( 'App.GameController testing: ', function() {
	var controller, game, field, player1, player2;

	var currentPlayerChangeSpy = jasmine.createSpy( 'didCurrentPlayerChange' );

	beforeEach( function() {
		player1 = App.Player.create({
			name: 'player1',
			mark: 'X'
		});
		player2 = App.Player.create({
			name: 'player2',
			mark: 'O'
		});

		controller = App.GameController.create();
		game = App.Game.create({
			player1: player1,
			player2: player2
		});
		game.reset();
		field = game.get( 'field' );
		currentPlayerChangeSpy.reset();

		controller.set( 'model', game );
	});

	it( 'makeMove() should set mark of current player on field and change current player', function() {
		var cells = field.get( 'cells' );

		controller.set( 'didCurrentPlayerChange', Ember.observer( 'model.currentPlayer', currentPlayerChangeSpy ) );
		spyOn( game, 'isGameOver' ).andReturn( false );
		spyOn( controller, 'endGame' );

		game.set( 'currentPlayer', player2 );

		controller.makeMove( cells[0][0] );

		expect( field.getValue( 0, 0 ) ).toEqual( player2.get( 'mark' ) );
		expect( game.get( 'currentPlayer' ) ).toEqual( player1 );
		expect( controller.endGame ).not.toHaveBeenCalled();
	} );

	it( 'makeMove() should call endGame() if there are game over', function() {
		var cells = field.get( 'cells' );

		controller.set( 'didCurrentPlayerChange', Ember.observer( 'model.currentPlayer', currentPlayerChangeSpy ) );
		spyOn( game, 'isGameOver' ).andReturn( true );
		spyOn( controller, 'endGame' );

		game.set( 'currentPlayer', player2 );

		controller.makeMove( cells[0][0] );

		expect( controller.endGame ).toHaveBeenCalled();
	} );

	it( 'endGame() should save current player as a winner if game has a winner', function() {
		var cells = field.get( 'cells' ),
			winnerCells = [
				cells[ 0 ][ 0 ],
				cells[ 0 ][ 1 ],
				cells[ 0 ][ 2 ],
				cells[ 0 ][ 3 ]
			];

		spyOn( game, 'findWinnerCells' ).andReturn( winnerCells );
		spyOn( controller, 'saveGameResult' );

		game.set( 'startTime', moment() );
		game.set( 'currentPlayer', player2 );

		controller.endGame();

		expect( controller.get( 'winner' ) ).toEqual( player2 );
		expect( controller.saveGameResult ).toHaveBeenCalled();
		expect( controller.saveGameResult.mostRecentCall.args[ 0 ].get( 'winnerName' ) ).toEqual( 'player2' );
	} );

	it( 'endGame() should save null as a winner name if game has no winner', function() {
		spyOn( game, 'findWinnerCells' ).andReturn( null );
		spyOn( controller, 'saveGameResult' );

		game.set( 'startTime', moment() );
		game.set( 'currentPlayer', player2 );

		controller.endGame();

		expect( controller.get( 'winner' ) ).toBeNull();
		expect( controller.saveGameResult ).toHaveBeenCalled();
		expect( controller.saveGameResult.mostRecentCall.args[ 0 ].get( 'winnerName' ) ).toBeNull();
	} );

	it( 'gameOverStatus should be "win" if player wins', function() {
		var cells = field.get( 'cells' ),
			winnerCells = [
				cells[ 0 ][ 0 ],
				cells[ 0 ][ 1 ],
				cells[ 0 ][ 2 ],
				cells[ 0 ][ 3 ]
			];

		spyOn( game, 'findWinnerCells' ).andReturn( winnerCells );
		spyOn( controller, 'saveGameResult' );

		game.set( 'startTime', moment() );
		game.set( 'currentPlayer', player1 );

		controller.endGame();

		expect( controller.get( 'gameOverStatus' ) ).toEqual( 'win' );
	} );

	it( 'gameOverStatus should be "lose" if computer wins', function() {
		var cells = field.get( 'cells' ),
			winnerCells = [
				cells[ 0 ][ 0 ],
				cells[ 0 ][ 1 ],
				cells[ 0 ][ 2 ],
				cells[ 0 ][ 3 ]
			];

		spyOn( game, 'findWinnerCells' ).andReturn( winnerCells );
		spyOn( controller, 'saveGameResult' );

		player2.set( 'isComputer', true );

		game.set( 'startTime', moment() );
		game.set( 'currentPlayer', player2 );

		controller.endGame();

		expect( controller.get( 'gameOverStatus' ) ).toEqual( 'lose' );
	} );

	it( 'gameOverStatus should be "draw" if we have no winner', function() {
		var cells = field.get( 'cells' );

		spyOn( game, 'findWinnerCells' ).andReturn( null );
		spyOn( controller, 'saveGameResult' );

		game.set( 'startTime', moment() );
		game.set( 'currentPlayer', player2 );

		controller.endGame();

		expect( controller.get( 'gameOverStatus' ) ).toEqual( 'draw' );
	} );

	it( 'saveGameResult() should save game result in gameResultStorage', function() {
		var storage = App.get( 'gameResultsStorage' ),
			gameResult = App.GameResultItem.create( {
				date: 1413999556616,
				playTime: 5900,
				winnerName: "Alex"
			} );

		spyOn( storage, 'addItem' );

		controller.saveGameResult( gameResult );

		expect( storage.addItem ).toHaveBeenCalledWith( gameResult );
	} );

	it( 'controller should call makeMove() on cellClick action', function() {
		var cells = field.get( 'cells' );

		spyOn( controller, 'makeMove' );

		controller.send( 'cellClick', cells[ 0 ][ 0 ] );

		expect( controller.makeMove ).toHaveBeenCalledWith( cells[ 0 ][ 0 ] );
	} );

	it( 'controller should reset game state on playAgain action', function() {
		spyOn( game, 'reset' );
		spyOn( game, 'start' );

		controller.send( 'playAgain' );

		expect( game.reset ).toHaveBeenCalled();
		expect( game.start ).toHaveBeenCalled();
	} );

});
