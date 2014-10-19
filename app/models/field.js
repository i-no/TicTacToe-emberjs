App.Field = Ember.Object.extend({
    //region Properties

    /**
     * Field cells.
     * @type {Array.<Array.<Cell>>}
     */
	cells: null,

    /**
     * Field size.
     * @type {number}
     * @default 5
     */
	size: 5,

    //endregion

	init: function() {
		var fieldSize = this.get( 'size' ),
			cells = new Array( fieldSize.rows);

		for ( var i = 0; i < fieldSize; i++ ) {
			cells[ i ] = new Array( fieldSize );

			for ( var j = 0; j < fieldSize; j++ ) {
				cells[ i ][ j ] = App.Cell.create({
					row: i,
					col: j
				});
			}
		}

		this.set( 'cells', cells );
	},

    //region Methods

    /**
     * Get empty cells of field.
     * @returns {Array.<Cell>}
     */
	getEmptyCells: function() {
		return this.toArray().filter( function( item ) {
			return item.get( 'isEmpty' );
		} );
	},

    /**
     * Clean field.
     */
	clear: function() {
		var cells = this.get( 'cells' );

		for ( var i = 0; i < cells.length; i++ ) {
			for ( var j = 0; j < cells[ i ].length; j++ ) {
				cells[ i ][ j ].set( 'value', null );
			}
		}
	},

    /**
     * Check that row and column indexes are in field ranges.
     * @param {number} row - Field row index. Zero based.
     * @param {number} col - Field column index. Zero based.
     * @returns {boolean}
     */
	isPositionValid: function( row, col ) {
		var fieldSize = this.get( 'size' );

		return !( row < 0 || row >= fieldSize || col < 0 || col >= fieldSize );
	},

    /**
     * Get field value.
     * @throws Throws error if row or column indexes are out of field ranges.
     * @param {number} row - Field row index. Zero based.
     * @param {number} col - Field column index. Zero based.
     * @returns {string|null}
     */
	getValue: function( row, col ) {
		var cells = this.get( 'cells' );

		if ( !this.isPositionValid( row, col ) ) {
			throw 'Invalid cell position: { ' + row + ', ' + col + '}';
		}

		return cells[ row ][ col ].get( 'value' );
	},

    /**
     * Set field value.
     * @throws Throws error if row or column indexes are out of field ranges.
     * @param {number} row - Field row index. Zero based.
     * @param {number} col - Field column index. Zero base.
     * @param {string} value
     */
	setValue: function( row, col, value ) {
		var cells = this.get( 'cells' );

		if ( !this.isPositionValid( row, col ) ) {
			throw 'Invalid cell position: { ' + row + ', ' + col + '}';
		}

		cells[ row ][ col ].set( 'value', value );
	},

    /**
     * Converts field to plain array of cells.
     * @returns {Array.<Cell>}
     */
	toArray: function() {
		var result = [],
			cells = this.get( 'cells' );

		for ( var i = 0; i < cells.length; i++ ) {
			for ( var j = 0; j < cells[i].length; j++ ) {
				result.push( cells[i][j] );
			}
		}

		return result;
	},

    /**
     * Get string representation of field.
     * @returns {string}
     */
	toString: function() {
		var result = '',
			cells = this.get( 'cells' );

		for ( var i = 0; i < cells.length; i++ ) {
			for ( var j = 0; j < cells[ i ].length; j++ ) {
				result += ( cells[ i ][ j ].get( 'value' ) || '.' ) + ' ';
			}

			result += '\n';
		}

		return result;
	},

    /**
     * Get row of field.
     * @param {number} index - Field row index
     * @returns {?Array.<Cell>}
     */
	getRow: function( index ) {
		var cells = this.get( 'cells' ),
			fieldSize = this.get( 'size' );

		if ( index >= fieldSize ) {
			console.log( 'Invalid row index: ' + index );
			return null;
		}

		return cells[ index ];
	},

    /**
     * Get column of field.
     * @param {number} index - Field column index
     * @returns {?Array.<Cell>}
     */
	getColumn: function( index ) {
		var cells = this.get( 'cells' ),
			fieldSize = this.get( 'size' ),
			column = [];

		if ( index >= fieldSize ) {
			console.log( 'Invalid column index: ' + index );
			return null;
		}

		for ( var i = 0; i < fieldSize; i++ ) {
			column.push( cells[ i ][ index ] );
		}

		return column;
	},

    /**
     * Get array of field diagonals of certain length.
     * @param {number} length - Diagonals length
     * @returns {Array.<Array.<Cell>>}
     */
	getDiagonals: function( length ) {
		var diagonal,
			cells = this.get( 'cells' ),
			z = 0,
			diagonals = [];

		for ( var i = 0; cells.length - i >= length && i < cells.length; i++ ) {
			for ( var j = 0; j < cells[ i ].length; j++ ) {
				if ( j + 1 >= length ) {
					diagonal = [];

					for ( z = 0; z < length; z++ ) {
						diagonal.push( cells[ i + z ][ j - z ] );
					}
					diagonals.push( diagonal );
				}

				if ( cells[ i ].length - j >= length ) {
					diagonal = [];

					for ( z = 0; z < length; z++ ) {
						diagonal.push( cells[ i + z ][ j + z ] );
					}
					diagonals.push( diagonal );
				}
			}
		}

		return diagonals;
	}

    //endregion
});
