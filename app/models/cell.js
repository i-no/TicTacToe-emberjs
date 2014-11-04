/**
 * Represents field cell.
 *
 * @module Models
 * @class Cell
 */
App.Cell = Ember.Object.extend( {
	//region Properties

	/**
	 * Row index.
	 *
	 * @property row
	 * @type {number}
	 */
	row: 0,

	/**
	 * Column index.
	 *
	 * @property col
	 * @type {number}
	 */
	col: 0,

	/**
	 * Cell value.
	 *
	 * @property value
	 * @type {string}
	 */
	value: null,

	/**
	 * Highlight cell.
	 *
	 * @property isHighlighted
	 * @type {boolean}
	 */
	isHighlighted: false,

	/**
	 * Check that current cell is empty.
	 *
	 * @property isEmpty
	 * @return {boolean} Returns <tt>false</tt> if cell value is equal to 'x' or 'o'. Otherwise returns <tt>true</tt>.
	 */
	isEmpty: function () {
		var value = ( this.get( 'value' ) || '' ).toUpperCase();

		return value !== 'X' && value !== 'O';
	}.property( 'value' )

	//endregion
} );
