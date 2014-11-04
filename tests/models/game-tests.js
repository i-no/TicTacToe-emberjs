describe( 'App.Game testing: ', function() {
	var game;

	var winnerFields = [
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'x', 'x' ],
				[ null, 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', null, 'o' ],
				[ 'o', 'x', 'o', null, null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'o', 'o' ],
				[ 'o', 'x', 'x', 'o', 'o' ],
				[ 'o', 'x', 'o', 'o', null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'x', 'o' ],
				[ 'o', 'x', 'o', null, 'x' ],
				[ 'o', 'x', 'o', 'o', null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'o', null ]
			]
		];

	var noWinnerFields = [
			[
				[ null, 'x', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', 'x' ],
				[ 'x', 'o', null, 'o', 'o' ],
				[ 'o', 'o', 'x', null, 'o' ],
				[ 'o', 'x', 'o', null, null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', null, 'o', 'o', 'o' ],
				[ 'o', 'x', 'x', null, 'o' ],
				[ 'o', 'x', 'o', 'o', null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'x', 'o' ],
				[ 'o', 'x', 'o', null, 'x' ],
				[ 'o', 'x', 'o', 'x', null ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'o', null ],
				[ 'o', 'x', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'o', null ]
			]
		];

	var fieldsWithDraw = [
			[
				[ 'o', 'x', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', 'x' ],
				[ 'x', 'o', 'x', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'o', 'o' ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'o', 'x', 'o', 'x' ],
				[ 'x', 'x', 'o', 'o', 'o' ],
				[ 'o', 'x', 'x', 'o', 'o' ],
				[ 'o', 'x', 'o', 'x', 'x' ]
			],
			[
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'x' ],
				[ 'x', 'o', 'o', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', 'x' ],
				[ 'x', 'x', 'o', 'x', 'o' ]
			],
			[
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'x', 'o', 'o' ],
				[ 'x', 'o', 'o', 'x', 'x' ],
				[ 'o', 'x', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'o', 'x' ]
			]
		];

	beforeEach( function() {
		game = App.Game.create({});
	});

	it( 'start() function should select who plays first and init players marks', function() {
		game.set( 'player1', App.Player.create( { name: 'player1' } ) );
		game.set( 'player2', App.Player.create( { name: 'player2' } ) );
		game.start();

		expect( game.get( 'currentPlayer' ) ).not.toBeNull();
		expect( game.get( 'player1.mark' ) ).not.toBeNull();
		expect( game.get( 'player2.mark' ) ).not.toBeNull();
		expect( game.get( 'startTime' ) ).not.toBeNull();
	});

	it( 'reset() function should clear field, reset current player and start game timer', function() {
		var field = game.get( 'field' ),
			fieldSize = field.get( 'size' );

		game.set( 'player1', App.Player.create( { name: 'player1' } ) );
		game.set( 'player2', App.Player.create( { name: 'player2' } ) );
		game.set( 'currentPlayer', game.get( 'player1' ) );
		game.set( 'startTime', moment() );
		field.setValues( noWinnerFields[0] );

		game.reset();

		expect( game.get( 'field' ).getEmptyCells().length ).toEqual( fieldSize * fieldSize );
		expect( game.get( 'currentPlayer' ) ).toBeNull();
		expect( game.get( 'startTime' ) ).toBeNull();
	});

	it( 'findWinnerCells() function should not be null if there are marksToWin marks of the same type' +
		' that  placed in a horizontal, vertical, or diagonal row', function() {
		var i,
			field = game.get( 'field' );

		for ( i = 0; i < winnerFields.length; i++ ) {
			field.setValues( winnerFields[i] );
			game.set( 'field', field );

			expect( game.findWinnerCells() ).not.toBeNull();
		}

		for ( i = 0; i < noWinnerFields.length; i++ ) {
			field.setValues( noWinnerFields[i] );
			game.set( 'field', field );

			expect( game.findWinnerCells() ).toBeNull();
		}

		for ( i = 0; i < fieldsWithDraw.length; i++ ) {
			field.setValues( fieldsWithDraw[i] );
			game.set( 'field', field );

			expect( game.findWinnerCells() ).toBeNull();
		}
	} );

	it( 'isGameOver() should be true if we have a winner or we have no empty cells', function() {
		var i,
			field = game.get( 'field' );

		for ( i = 0; i < winnerFields.length; i++ ) {
			field.setValues( winnerFields[i] );
			game.set( 'field', field );
			expect( game.isGameOver() ).toBeTruthy();
		}

		for ( i = 0; i < noWinnerFields.length; i++ ) {
			field.setValues( noWinnerFields[i] );
			game.set( 'field', field );
			expect( game.isGameOver() ).toBeFalsy();
		}

		for ( i = 0; i < fieldsWithDraw.length; i++ ) {
			field.setValues( fieldsWithDraw[i] );
			game.set( 'field', field );
			expect( game.isGameOver() ).toBeTruthy();
		}
	} );

	it( 'nextPlayer() should return player different from currentPlayer', function() {
		var player1 = App.Player.create({
				name: 'player1'
			}),
			player2 = App.Player.create({
				name: 'player2'
			});

		game.setProperties({
			player1: player1,
			player2: player2,
			currentPlayer: player1
		});

		expect( game.nextPlayer() ).toEqual( player2 );
	} );
} );