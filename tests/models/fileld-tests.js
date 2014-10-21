describe( 'App.Field testing: ', function() {
	var field;

	function isArraysEqual( cellArray, array ) {
		if ( cellArray.length !== array.length ) return false;

		for ( var i = 0; i < cellArray.length; i++ ) {
			if ( cellArray[ i ].get( 'value' ).toUpperCase() !== array[ i ].toUpperCase() ) {
				return false;
			}
		}

		return true;
	}

	beforeEach( function() {
		field = App.Field.create( {
			size: 5
		} );
	});

	it( 'getValue() should return value for certain row and column', function() {
		var cells = [
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'x', 'x', 'x', 'x', 'x' ],
				[ 'o', 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', null ]
			];

		field.setValues( cells );

		expect( field.getValue( 0, 0 ) ).toEqual( 'x' );
		expect( field.getValue( 1, 3 ) ).toEqual( 'x' );
		expect( field.getValue( 1, 4 ) ).toEqual( 'x' );
		expect( field.getValue( 2, 3 ) ).toEqual( 'o' );
		expect( field.getValue( 4, 4 ) ).toEqual( null );
	} );

	it( 'getValue() with invalid indexes should throw error', function() {
		var size = field.get( 'size' );

		expect( function() { field.getValue( -1, 0 ); } ).toThrow();
		expect( function() { field.getValue( 0, -1 ); } ).toThrow();
		expect( function() { field.getValue( size, 0 ); } ).toThrow();
		expect( function() { field.getValue( 0, size ); } ).toThrow();
		expect( function() { field.getValue( size, size ); } ).toThrow();
	} );

	it( 'setValue() should set value for certain row and column', function() {
		var cells;

		field.setValue( 0, 0, 'x' );
		field.setValue( 1, 2, 'o' );
		field.setValue( 2, 2, 'o' );
		field.setValue( 3, 1, 'x' );
		field.setValue( 4, 0, 'x' );

		cells = field.get( 'cells' );

		expect( cells[0][0].get( 'value' ) ).toEqual( 'x' );
		expect( cells[1][2].get( 'value' ) ).toEqual( 'o' );
		expect( cells[2][2].get( 'value' ) ).toEqual( 'o' );
		expect( cells[3][1].get( 'value' ) ).toEqual( 'x' );
		expect( cells[4][0].get( 'value' ) ).toEqual( 'x' );
	} );

	it( 'setValue() with invalid indexes should throw error', function() {
		var size = field.get( 'size' );

		expect( function() { field.setValue( -1, 0 ); } ).toThrow();
		expect( function() { field.setValue( 0, -1 ); } ).toThrow();
		expect( function() { field.setValue( size, 0 ); } ).toThrow();
		expect( function() { field.setValue( 0, size ); } ).toThrow();
		expect( function() { field.setValue( size, size ); } ).toThrow();
	} );

	it( 'empty field should have size*size empty cells', function() {
		var size = field.get( 'size' );

		expect( field.getEmptyCells().length ).toEqual( size * size );
	} );

	it( 'getRow() should return row with certain index', function() {
		var cells = [
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'x', 'x', 'x', 'x', 'x' ],
				[ 'o', 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', 'o' ]
			];
		field.setValues( cells );

		expect( isArraysEqual( field.getRow( 0 ), [ 'x', 'o', 'x', 'x', 'o' ] ) ).toBeTruthy();
		expect( isArraysEqual( field.getRow( 3 ), [ 'o', 'o', 'x', 'x', 'o' ] ) ).toBeTruthy();
		expect( isArraysEqual( field.getRow( 4 ), [ 'o', 'x', 'o', 'x', 'o' ] ) ).toBeTruthy();
	});

	it( 'getRow() with invalid row index should throw exception', function() {
		var size = field.get( 'size' );

		expect( function() { field.getRow( -1 ); } ).toThrow();
		expect( function() { field.getRow( size ); } ).toThrow();
	});

	it( 'getColumn() should return column with certain index', function() {
		var cells = [
			[ 'x', 'o', 'x', 'x', 'o' ],
			[ 'x', 'x', 'x', 'x', 'x' ],
			[ 'o', 'o', 'o', 'o', 'o' ],
			[ 'o', 'o', 'x', 'x', 'o' ],
			[ 'o', 'x', 'o', 'x', 'o' ]
		];
		field.setValues( cells );

		expect( isArraysEqual( field.getColumn( 0 ), [ 'x', 'x', 'o', 'o', 'o' ] ) ).toBeTruthy();
		expect( isArraysEqual( field.getColumn( 3 ), [ 'x', 'x', 'o', 'x', 'x' ] ) ).toBeTruthy();
		expect( isArraysEqual( field.getColumn( 4 ), [ 'o', 'x', 'o', 'o', 'o' ] ) ).toBeTruthy();
	});

	it( 'getColumn() with invalid column index should throw exception', function() {
		var size = field.get( 'size' );

		expect( function() { field.getColumn( -1 ); } ).toThrow();
		expect( function() { field.getColumn( size ); } ).toThrow();
	});

	it( 'clear() function should clear field', function() {
		var cells = [
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'x', 'x', 'x', 'x', 'x' ],
				[ 'o', 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', 'x', 'o', 'x', 'o' ]
			],
			size = field.get( 'size' );

		field.setValues( cells );

		expect( field.getEmptyCells().length ).not.toEqual( size*size );

		field.clear();

		expect( field.getEmptyCells().length ).toEqual( size*size );
	});

	it( 'getDiagonals() should return diagonals of certain size', function() {
		var diagonals,
			cells = [
				[ 'x', 'o', 'x', 'x', 'o' ],
				[ 'x', 'x', 'x', 'x', 'x' ],
				[ 'o', 'o', 'o', 'o', 'o' ],
				[ 'o', 'o', 'x', 'x', 'o' ],
				[ 'o', null, 'o', 'x', 'o' ]
			],
			validResult = [
				['x', 'x', 'o', 'x'],
				['o', 'x', 'o', 'o'],
				['x', 'x', 'o', 'o'],
				['o', 'x', 'o', 'o'],
				['x', 'o', 'x', 'x'],
				['x', 'o', 'x', 'o'],
				['x', 'o', 'x', null]
			];

		field.setValues( cells );

		diagonals = field.getDiagonals( 4 );

		for ( var i = 0; i < validResult.length; i++ ) {
			expect( isArraysEqual( diagonals[ i ], validResult[ i ] ) ).toBeTruthy();;
		}
	})
} );
