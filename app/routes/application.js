/**
 * @module Routes
 * @class ApplicationRoute
 */
App.ApplicationRoute = Ember.Route.extend( {
	actions: {
		/**
		 * Show modal dialog.
		 *
		 * @method showModal
		 * @param {string} name Modal dialog name to show.
		 * @param {object} model Data for modal dialog controller.
		 */
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

		/**
		 * Hide modal dialog.
		 *
		 * @method removeModal
		 */
		removeModal: function () {
			this.disconnectOutlet( {
				outlet: 'modal',
				parentView: 'application'
			} );
		}
	}
} );
