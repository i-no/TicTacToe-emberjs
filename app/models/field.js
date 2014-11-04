/**
 * Represents game field.
 *
 * @module Models
 * @class Field
 */
App.Field = Ember.Object.extend( {
	//region Properties

	/**
	 * Field cells.
	 *
	 * @property cells
	 * @type {[Cell[]]}
	 */
	cells: null,

	/**
	 * Field size.
	 *
	 * @property size
	 * @type {number}
	 * @default 5
	 */
	size: 5,

	//endregion

	init: function () {
		var fieldSize = this.get( 'size' ),
			cells = new Array( fieldSize.rows );

		for ( var i = 0; i < fieldSize; i++ ) {
			cells[ i ] = new Array( fieldSize );

			for ( var j = 0; j < fieldSize; j++ ) {
				cells[ i ][ j ] = App.Cell.create( {
					row: i,
					col: j
				} );
			}
		}

		this.set( 'cells', cells );
	},

	//region Methods

	/**
	 * Get empty cells of field.
	 *
	 * @method getEmptyCells
	 * @return {Cell[]} Array of empty field cells.
	 */
	getEmptyCells: function () {
		return this.toArray().filter( function ( item ) {
			return item.get( 'isEmpty' );
		} );
	},

	/**
	 * Clean field.
	 *
	 * @method clear
	 */
	clear: function () {
		var cells = this.get( 'cells' );

		for ( var i = 0; i < cells.length; i++ ) {
			for ( var j = 0; j < cells[ i ].length; j++ ) {
				cells[ i ][ j ].set( 'value', null );
				cells[ i ][ j ].set( 'isHighlighted', false );
			}
		}
	},

	/**
	 * Check that row and column indexes are in field ranges.
	 *
	 * @method isPositionValid
	 * @param {number} row Field row index. Zero based.
	 * @param {number} col Field column index. Zero based.
	 * @return {boolean}
	 */
	isPositionValid: function ( row, col ) {
		var fieldSize = this.get( 'size' );

		return !( row < 0 || row >= fieldSize || col < 0 || col >= fieldSize );
	},

	/**
	 * Get field value.
	 *
	 * @method getValue
	 * @throws Throws error if row or column indexes are out of field ranges.
	 * @param {number} row Field row index. Zero based.
	 * @param {number} col Field column index. Zero based.
	 * @return {string} Returns field cell value.
	 */
	getValue: function ( row, col ) {
		var cells = this.get( 'cells' );

		if ( !this.isPositionValid( row, col ) ) {
			throw 'Invalid cell position: { ' + row + ', ' + col + '}';
		}

		return cells[ row ][ col ].get( 'value' );
	},

	/**
	 * Set field value.
	 *
	 * @method setValue
	 * @throws Throws error if row or column indexes are out of field ranges.
	 * @param {number} row Field row index. Zero based.
	 * @param {number} col Field column index. Zero base.
	 * @param {string} value Value to set.
	 */
	setValue: function ( row, col, value ) {
		var cells = this.get( 'cells' );

		if ( !this.isPositionValid( row, col ) ) {
			throw 'Invalid cell position: { ' + row + ', ' + col + '}';
		}

		cells[ row ][ col ].set( 'value', value );
	},

	/**
	 * Set field values.
	 *
	 * @method setValues
	 * @param {string[][]} values Two dimensional array of strings that should be set into field.
	 */
	setValues: function( values ) {
		var cells = this.get( 'cells' ),
			fieldSize = this.get( 'size' );

		for ( var i = 0; i < fieldSize; i++ ) {
			for ( var j = 0; j < fieldSize; j++ ) {
				if ( i < values.length && j < values[ i ].length ) {
					cells[ i ][ j ].set( 'value', values[ i ][ j ] );
				}
				else {
					cells[ i ][ j ].set( 'value', null );
				}
			}
		}

		this.set( 'cells', cells );
	},

	/**
	 * Converts field to plain array of cells.
	 *
	 * @method toArray
	 * @return {Cell[]} Array of field cells.
	 */
	toArray: function () {
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
	 *
	 * @method toString
	 * @return {string} String representation of field.
	 */
	toString: function () {
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
	 *
	 * @method getRow
	 * @throws Throws error if row index is out of range.
	 * @param {number} index Field row index
	 * @return {Cell[]} Array of cells that represents row of field.
	 */
	getRow: function ( index ) {
		var cells = this.get( 'cells' ),
			fieldSize = this.get( 'size' );

		if ( index < 0 || index >= fieldSize ) {
			throw 'Invalid row index: ' + index;
		}

		return cells[ index ];
	},

	/**
	 * Get column of field.
	 *
	 * @method getColumn
	 * @throws Throws error if column index is out of range.
	 * @param {number} index Field column index
	 * @return {Cell[]} Array of cells that represents column of field.
	 */
	getColumn: function ( index ) {
		var cells = this.get( 'cells' ),
			fieldSize = this.get( 'size' ),
			column = [];

		if ( index < 0 || index >= fieldSize ) {
			throw 'Invalid column index: ' + index;
		}

		for ( var i = 0; i < fieldSize; i++ ) {
			column.push( cells[ i ][ index ] );
		}

		return column;
	},

	/**
	 * Get array of field diagonals of certain length.
	 *
	 * @method getDiagonals
	 * @param {number} length Diagonals length
	 * @return {Cell[][]} Array of diagonals.
	 */
	getDiagonals: function ( length ) {
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
	},

	/**
	 * Highlight field cells.
	 *
	 * @method highlightCells
	 * @param {Cell[]} cells Array of cell that need to highlight.
	 */
	highlightCells: function( cells ) {
		if ( Ember.isEmpty( cells ) ) return;

		for ( var i = 0; i < cells.length; i++ ) {
			cells[ i ].set( 'isHighlighted', true );
		}
	}

	//endregion
} );
