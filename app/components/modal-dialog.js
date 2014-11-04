/**
 * @module Components
 * @class ModalDialogComponent
 */
App.ModalDialogComponent = Ember.Component.extend( {
	showCancelBtn: true,

	showCloseBtn: true,

	showFooter: true,

	customButtons: null,

	backdrop: true,

	isVisible: true,

	init: function() {
		var componentName = this.get( 'componentName' ),
			controller = this.get( 'targetObject' );

		this._super.apply( this, arguments );

		if ( !Ember.isEmpty( componentName ) && !Ember.isNone( controller ) ) {
			controller.set( componentName, this );
		}
	},

	didInsertElement: function () {
		var self = this;

		this._super();

		this.$( '.modal' )
			.on( 'show.bs.modal', function () {
				setTimeout( function() {
					self.sendAction( 'onModalShow' );
				}, 0 );
			}.bind( this ) )
			.on( 'shown.bs.modal', function () {
				setTimeout( function() {
					self.sendAction( 'onModalShown' );
				}, 0 );
			}.bind( this ) )
			.on( 'hidden.bs.modal', function () {
				setTimeout( function() {
					self.sendAction( 'onModalHidden' );
				}, 0 );
			}.bind( this ) )
			.modal(
			{
				backdrop: this.get( 'backdrop' )
			} );
	},

	didIsVisibleChange: function () {
		if ( this.get( 'isVisible' ) ) {
			this.$( '.modal' ).modal( 'show' );
		}
		else {
			this.$( '.modal' ).modal( 'hide' );
			this.isVisible = true;
		}
	}.observes( 'isVisible' ),

	actions: {
		customBtnClick: function ( btnData ) {
			if ( Ember.isNone( btnData ) ) return;

			if ( btnData.closeModal ) {
				this.set( 'isVisible', false );
			}

			if ( typeof btnData.action === 'string' ) {
				this.sendAction( btnData.action );
			}
		},
		ok: function () {
			this.set( 'isVisible', false );
			this.sendAction( 'ok' );
		},
		cancel: function () {
			this.set( 'isVisible', false );
			this.sendAction( 'cancel' );
		},
		submit: function() {
			console.log( 'submit' );
		}
	}
} );
