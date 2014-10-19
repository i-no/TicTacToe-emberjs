App.HighscoresStorage = Ember.Object.extend({
	items: [],

	storageKey: 'TicTacToeStorage',

	maxItemsToStore: 10,

	save: function() {
		var data,
			items = this.get( 'items' ),
			maxItemsToStore =this.get( 'maxItemsToStore' );

		if ( Ember.isEmpty( items ) ) return;

		data = JSON.stringify( items.slice( 0, maxItemsToStore ) );

		localStorage.setItem( this.get( 'storageKey' ), data );
	},

	load: function() {
		var data = localStorage.getItem( this.get( 'storageKey' ) ) || '[]',
			items = JSON.parse( data ).map( function( item ) {
				return App.HighscoresItem.create( item );
			} );


		this.set( 'items', items );

		return items;
	},

	addItem: function( item ) {
		var items = this.get( 'items' ),
			maxItemsToStore = this.get( 'maxItemsToStore' );

		if ( Ember.isNone( item ) ) return false;

		items.unshift( item );

		if ( items.length > maxItemsToStore ) {
			items = items.slice( 0, maxItemsToStore );
		}

		this.set( 'items', items );
		this.save();
	}
});
