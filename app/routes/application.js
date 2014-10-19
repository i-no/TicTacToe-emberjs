App.ApplicationRoute = Ember.Route.extend( {
	actions: {
		showModal: function ( name, model ) {
			var controller = this.controllerFor( name );

			if ( model ) {
				controller.set( 'content', model );
			}

			this.render( name, {
				into: 'application',
				outlet: 'modal'
			} );
		},

		removeModal: function () {
			this.disconnectOutlet( {
				outlet: 'modal',
				parentView: 'application'
			} );
		}
	}
} );
