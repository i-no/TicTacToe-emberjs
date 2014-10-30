/**
 * @module Controllers
 * @class PlayerNameModalController
 */
App.PlayerNameModalController = Ember.ObjectController.extend( {
	/**
	 * Controller dependencies.
	 */
	needs: [ 'game' ],

	/**
	 * Player name.
	 *
	 * @property playerName
	 * @type {string}
	 * @default {null}
	 */
	playerName: null,

	saveBtn: {
		title: 'Save',
		action: 'saveName',
		style: 'btn-success'
	},

	cancelBtn: {
		title: 'Cancel',
		action: 'cancel',
		style: 'btn-default',
		closeModal: true,
		isHidden: true
	},

	/**
	 * List of buttons for modal dialog.
	 *
	 * @property customModalButtons
	 * @type {Object[]}
	 */
	customModalButtons: [],

	init: function () {
		this.customModalButtons.addObjects( [
			this.get( 'saveBtn' ),
			this.get( 'cancelBtn' )
		] );
	},

	didNameChange: function () {
		this.set( 'playerName', this.get( 'player.name' ) );
	}.observes( 'player.name' ),

	isNameRequiredChange: function () {
		this.set( 'cancelBtn.isHidden', this.get( 'isNameRequired' ) )
	}.observes( 'isNameRequired' ),

	/**
	 * Define that player data is valid or not.
	 *
	 * @property isValid
	 * @type {boolean}
	 */
	isValid: true,

	/**
	 * Player name validation message.
	 *
	 * @property validationMessage
	 * @type {string}
	 */
	validationMessage: 'Player name should not be empty',

	/**
	 * Validate player name.
	 *
	 * @method validateName
	 * @returns {boolean} Returns <tt>true</tt> if player name is valid. Otherwise returns <tt>false</tt>.
	 */
	validateName: function () {
		var name = $.trim( this.get( 'playerName' ) || '' ),
			isValid = !Ember.isEmpty( name );

		this.set( 'isValid', isValid );
		return isValid;
	},

	actions: {
		onModalShow: function () {
			this.set( 'isValid', true );
			this.set( 'playerName', this.get( 'player.name' ) );
		},
		onModalShown: function() {
			var modal = this.get( 'modal' );

			modal.$( 'input' ).focus();
		},
		onModalHidden: function() {
			var gameController = this.get( 'controllers.game' );

			this.send( 'removeModal' );
			gameController.send( 'playerNameModalClosed' );
		},
		saveName: function () {
			var modal = this.get( 'modal' );

			if ( this.validateName() ) {
				this.set( 'player.name', this.get( 'playerName' ) );
				modal.set( 'isVisible', false );
			}
		},
		submit: function() {
			this.send( 'saveName' );
		}
	}
} );
