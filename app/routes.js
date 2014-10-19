App.Router.map( function () {
	this.resource( 'game' );
	this.resource( 'notfound', { path: '/*wildcard' } );
} );
