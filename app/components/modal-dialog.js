App.ModalDialogComponent = Ember.Component.extend( {
	showCancelBtn: true,

	showCloseBtn: true,

	showFooter: true,

	customButtons: null,

	backdrop: true,

	isVisible: true,

	didInsertElement: function () {
		this._super();

		this.$( '.modal' )
			.on( 'show.bs.modal', function () {
				this.sendAction( 'onModalShow' );
			}.bind( this ) )
			.on( 'shown.bs.modal', function () {
				this.sendAction( 'onModalShown' );
			}.bind( this ) )
			.on( 'hidden.bs.modal', function () {
				this.sendAction( 'onModalHidden' );
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
		}
	}.observes( 'isVisible' ),

	actions: {
		customBtnClick: function ( btnData ) {
			if ( Ember.isNone( btnData ) ) return;

			if ( btnData.closeModal ) {
				this.set( 'isVisible', false );
			}

			if ( typeof btnData.action === 'string' ) {
				this.sendAction( btnData.action, this );
			}
		},
		ok: function () {
			this.set( 'isVisible', false );
			this.sendAction( 'ok' );
		},
		cancel: function () {
			this.set( 'isVisible', false );
			this.sendAction( 'cancel' );
		}
	}
} );
