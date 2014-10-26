/**
 * @module Controllers
 * @class PlayerNameModalController
 */
App.PlayerNameModalController = Ember.ObjectController.extend( {
	/**
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

	isValid: true,

	validationMessage: 'Player name should not be empty',

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

		},
		saveName: function ( modal ) {
			if ( this.validateName() ) {
				this.set( 'player.name', this.get( 'playerName' ) );
				modal.set( 'isVisible', false );
			}
		}
	}
} );
