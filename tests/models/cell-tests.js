describe( 'App.Cell testing', function() {
	var cell;

	beforeEach( function() {
		cell = App.Cell.create({});
	});

	it( 'cell with "x" mark should not be empty', function() {
		cell.set( 'value', 'x' );
		expect( cell.get( 'isEmpty' ) ).toBeFalsy();
	} );

	it( 'cell with "o" mark should not be empty', function() {
		cell.set( 'value', 'o' );
		expect( cell.get( 'isEmpty' ) ).toBeFalsy();
	} );

	it( 'cell with no marks should be empty', function() {
		cell.set( 'value', null );
		expect( cell.get( 'isEmpty' ) ).toBeTruthy();
	} );
});
