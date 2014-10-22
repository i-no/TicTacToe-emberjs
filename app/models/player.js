/**
 * @module Models
 * @class Player
 */
App.Player = Ember.Object.extend( {
	/**
	 * Player name.
	 *
	 * @property name
	 * @type {string}
	 */
	name: '',

	/**
	 * Player mark to set of field.
	 *
	 * @property mark
	 * @type {string}
	 * @default {null}
	 */
	mark: null
} );
