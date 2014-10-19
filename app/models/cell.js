App.Cell = Ember.Object.extend({
    //region Properties

    /**
     * @type {number}
     */
    row: 0,

    /**
     * @type {number}
     */
	col: 0,

    /**
     * @type {string}
     */
	value: null,

    /**
     * Check that current cell is empty.
     * @return {boolean} Returns false if cell value is equal to 'x' or 'o'. Otherwise returns true.
     */
	isEmpty: function() {
		var value = ( this.get( 'value' ) || '' ).toUpperCase();

		return value !== 'X' && value !== 'O';
	}.property( 'value' )

    //endregion
});
