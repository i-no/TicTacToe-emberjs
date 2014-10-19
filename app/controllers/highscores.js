App.HighscoresController = Ember.ObjectController.extend({
	highscores: function() {
		var storage = App.get( 'highscoresStorage' );

		return storage.get( 'items' );
	}.property( 'App.highscoresStorage.items' )
});
