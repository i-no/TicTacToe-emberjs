/**
 * @module Models
 * @class HighscoresStorage
 */
App.HighscoresStorage = Ember.Object.extend( {
	/**
	 * List of highscores.
	 *
	 * @property items
	 * @type {HighscoresItem[]}
	 */
	items: [],

	/**
	 * Key to store data in browser web storage.
	 *
	 * @property storageKey
	 * @type {string}
	 */
	storageKey: 'TicTacToeStorage',

	/**
	 * Max items count to store in storage.
	 *
	 * @property maxItemsToStore
	 * @type {number}
	 * @default 10
	 */
	maxItemsToStore: 10,

	/**
	 * Save highscores in web storage.
	 *
	 * @method save
	 */
	save: function () {
		var data,
			items = this.get( 'items' ),
			maxItemsToStore = this.get( 'maxItemsToStore' );

		if ( Ember.isEmpty( items ) ) return;

		data = JSON.stringify( items.slice( 0, maxItemsToStore ) );

		localStorage.setItem( this.get( 'storageKey' ), data );
	},

	/**
	 * Load highscore items from storage.
	 *
	 * @method load
	 * @return {HighscoresItem[]}
	 */
	load: function () {
		var data = localStorage.getItem( this.get( 'storageKey' ) ) || '[]',
			items = JSON.parse( data ).map( function ( item ) {
				return App.HighscoresItem.create( item );
			} );


		this.set( 'items', items );

		return items;
	},

	/**
	 * Add highscore item to storage.
	 *
	 * @method addItem
	 * @param {HighscoresItem} item Item to add.
	 */
	addItem: function ( item ) {
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
} );
