/**
 * @module Models
 * @class HighscoresItem
 */
App.HighscoresItem = Ember.Object.extend( {
	/**
	 * Game winner name.
	 *
	 * @property winnerName
	 * @type {string}
	 * @default {null}
	 */
	winnerName: null,

	/**
	 * Date of the game in milliseconds.
	 *
	 * @property date
	 * @type {number}
	 * @default 0
	 */
	date: 0,

	/**
	 * Game duration in milliseconds.
	 *
	 * @property playTime
	 * @type {number}
	 * @default 0
	 */
	playTime: 0
} );
