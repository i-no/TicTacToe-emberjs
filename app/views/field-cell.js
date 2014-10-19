/**
 * @module Views
 * @class FieldCellView
 */
App.FieldCellView = Ember.View.extend( {
	template: Ember.Handlebars.compile(
		'<div class="cell-content"></div>'
	),

	classNames: [ 'field-cell' ],

	classNameBindings: [ 'isX:x', 'isO:o' ],

	/**
	 * Cell data.
	 *
	 * @property cell
	 * @type {Cell}
	 * @default {null}
	 */
	cell: null,

	/**
	 * Computed property that returns <tt>true</tt> if cell value is equal to 'X'. Otherwise returns <tt>false</tt>.
	 *
	 * @property isX
	 * @type {boolean}
	 */
	isX: function () {
		var cell = this.get( 'cell' ),
			value = '';

		if ( !Ember.isNone( cell ) ) {
			value = cell.get( 'value' ) || '';
		}

		return value.toUpperCase() === 'X';
	}.property( 'cell.value' ),

	/**
	 * Computed property that returns <tt>true</tt> if cell value is equal to 'O'. Otherwise returns <tt>false</tt>.
	 *
	 * @property isO
	 * @type {boolean}
	 */
	isO: function () {
		var cell = this.get( 'cell' ),
			value = '';

		if ( !Ember.isNone( cell ) ) {
			value = cell.get( 'value' ) || '';
		}

		return value.toUpperCase() === 'O';
	}.property( 'cell.value' ),

	/**
	 * Fires when user click on cell.
	 *
	 * @event click
	 */
	click: function () {
		this.get( 'controller' ).send( 'cellClick', this.get( 'cell' ) );
	}
} );
