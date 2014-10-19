Ember.Handlebars.helper( 'formatDate', function( value, options ) {
	var date,
		format = 'L';

	if ( options.hash.isUtc ) {
		date = moment.utc( value );
	}
	else {
		date = moment( value );
	}

	if ( !Ember.isEmpty( options.hash.format ) ) {
		format = options.hash.format;
	}

	return date.format( format );
});
