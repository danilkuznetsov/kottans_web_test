describe('store', function() {
    'use strict';
    var storeService, storeEngine, testCallback;

    var expectedDataObj = {
        count: 123
    };

    beforeEach(function() {
        testCallback = jasmine.createSpy("callback");

        storeEngine = jasmine.createSpyObj('storeEngine', ['read', 'save']);
        storeEngine.read.and.returnValue(expectedDataObj);

        storeService = new app.StoreService(storeEngine);
    });

    it('should save data in storage engine', function() {
        storeService.save('count', 123, testCallback);

        expect(storeEngine.save).toHaveBeenCalledWith(expectedDataObj);
        expect(testCallback).toHaveBeenCalledWith(expectedDataObj);
    });

    it('should read all data in storage engine', function() {
        var actualDataObj = storeService.read(testCallback);

        expect(storeEngine.read).toHaveBeenCalled();
        expect(testCallback).toHaveBeenCalledWith(expectedDataObj);
    });
});