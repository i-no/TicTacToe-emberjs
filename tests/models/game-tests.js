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
			],
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
				[ 'o', 'x', 'x', 'o', 'o' ],
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
				[ 'x', 'o', 'o', 'o', 'o' ],
				[ 'o', 'x', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'o', null ]
			],
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
			],
		];

	beforeEach( function() {
		game = App.Game.create({});
	});

	it( 'start() function should clear field and init players', function() {
		var field = game.get( 'field' ),
			cells = noWinnerFields[0],
			fieldSize = field.get( 'size' );

		field.setValues( cells );
		game.set( 'field', field );
		game.clear();

		expect( game.get( 'player1' ) ).not.toBeNull();
		expect( game.get( 'player2' ) ).not.toBeNull();
		expect( game.get( 'currentPlayer' ) ).not.toBeNull();
		expect( game.get( 'field' ).getEmptyCells().length ).toEqual( fieldSize * fieldSize );
	});

	it( 'hasWinner() function should return true if there are marksToWin marks of the same type' +
		' that  placed in a horizontal, vertical, or diagonal row', function() {
		var i,
			field = game.get( 'field' );

		for ( i = 0; i < winnerFields.length; i++ ) {
			field.setValues( winnerFields[i] );
			game.set( 'field', field );
			expect( game.hasWinner() ).toBeTruthy();
		}

		for ( i = 0; i < noWinnerFields.length; i++ ) {
			field.setValues( noWinnerFields[i] );
			game.set( 'field', field );
			expect( game.hasWinner() ).toBeFalsy();
		}

		for ( i = 0; i < fieldsWithDraw.length; i++ ) {
			field.setValues( fieldsWithDraw[i] );
			game.set( 'field', field );
			expect( game.hasWinner() ).toBeFalsy();
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