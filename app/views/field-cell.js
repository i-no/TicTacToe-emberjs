App.FieldCellView = Ember.View.extend( {
	template: Ember.Handlebars.compile(
		'<div class="cell-content"></div>'
	),

	classNames: [ 'field-cell' ],

	classNameBindings: [ 'isX:x', 'isO:o' ],

	cell: null,

	isX: function () {
		var cell = this.get( 'cell' ),
			value = '';

		if ( !Ember.isNone( cell ) ) {
			value = cell.get( 'value' ) || '';
		}

		return value.toUpperCase() === 'X';
	}.property( 'cell.value' ),

	isO: function () {
		var cell = this.get( 'cell' ),
			value = '';

		if ( !Ember.isNone( cell ) ) {
			value = cell.get( 'value' ) || '';
		}

		return value.toUpperCase() === 'O';
	}.property( 'cell.value' ),

	click: function () {
		this.get( 'controller' ).send( 'cellClick', this.get( 'cell' ) );
	}
} );
