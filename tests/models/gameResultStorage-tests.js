describe( 'App.GameResultStorage testing:', function() {
	var storage,
		storageKey = 'TicTacToeStorage_test';

	var testData = [
			App.GameResultItem.create( {
				date: 1413999566997,
				playTime: 16296,
				winnerName: "Alex"
			}),
			App.GameResultItem.create( {
				date: 1413999556616,
				playTime: 5900,
				winnerName: "Alex"
			}),
			App.GameResultItem.create( {
				date: 1413999537695,
				playTime: 10917,
				winnerName: "Alex"
			}),
			App.GameResultItem.create( {
				date: 1413394151938,
				playTime: 6067,
				winnerName: "test"
			}),
			App.GameResultItem.create( {
				date: 1413394059628,
				playTime: 3482,
				winnerName: "test"
			}),
			App.GameResultItem.create( {
				date: 1413394050072,
				playTime: 49703,
				winnerName: "test"
			}),
			App.GameResultItem.create( {
				date: 1413145258473,
				playTime: 9160,
				winnerName: "Valex"
			}),
			App.GameResultItem.create( {
				date: 1413145228451,
				playTime: 8390,
				winnerName: "Alex"
			}),
			App.GameResultItem.create( {
				date: 1413133480463,
				playTime: 2170,
				winnerName: ""
			}),
			App.GameResultItem.create( {
				date: 1413133475292,
				playTime: 2313,
				winnerName: ""
			})
		];

	var testDataStr = JSON.stringify( testData );

	beforeEach( function() {
		storage = App.GameResultStorage.create({
			storageKey: storageKey
		});

		localStorage.removeItem( storageKey );
	});

	it( 'save() function should save data in browser local storage', function() {
		storage.set( 'items', testData );

		storage.save();

		expect( localStorage.getItem( storageKey ) ).toEqual( testDataStr );
	} );

	it( 'load() function should load data from browser local storage', function() {
		localStorage.setItem( storageKey, testDataStr );

		expect( storage.load() ).toEqual( testData );
	} );

	it( 'addItem() should add item to items list and save data in local storage', function() {
		spyOn( storage, 'save' );

		storage.addItem(
			App.GameResultItem.create( {
				date: 1413145228451,
				playTime: 8390,
				winnerName: "Alex"
			})
		);

		expect( storage.get( 'items' ).length ).toEqual( 1 );
		expect( storage.save ).toHaveBeenCalled();
	} );

	it( 'storage should not store more than "maxItemsToStore" items', function() {
		var maxItemsToStore = storage.get( 'maxItemsToStore' );

		storage.set( 'items', testData );
		storage.addItem(
			App.GameResultItem.create( {
				date: 1413145228451,
				playTime: 8390,
				winnerName: "Alex"
			})
		);

		expect( storage.get( 'items' ).length ).toEqual( maxItemsToStore );
		expect( storage.load().length ).toEqual( maxItemsToStore );
	} );
} );
