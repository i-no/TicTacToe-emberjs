__karma__.loaded = function() {};

App.rootElement = '#ember-testing';

App.setupForTesting();
App.injectTestHelpers();

var karma_started = false;
App.initializer({
	name: "run tests",
	initialize: function(container, application) {
		if (!karma_started) {
			karma_started = true;
			__karma__.start();
		}
	}
});
