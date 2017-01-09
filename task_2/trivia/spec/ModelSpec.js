describe('model ', function() {
    'use strict';

    var model, storeServiceMock, storageEngineMock, testCallbackMock;

    function setUpModel(storeService) {
        model = new app.Model(storeService);
    }

    beforeEach(function() {
        testCallbackMock = jasmine.createSpy('callback');

        storageEngineMock = jasmine.createSpyObj('storeEngine', ['read', 'save']);
        storageEngineMock.read.and.returnValue({
            countAnswer: 100,
            countQuestion: 100,
        });

        storeServiceMock = jasmine.createSpyObj('storeServiceMock', ['readAll', 'readByKey', 'saveByKey', 'getQuestion']);
        storeServiceMock.readByKey.and.returnValue({
            countAnswer: 100,
            countQuestion: 100,
        });

        storeServiceMock.getQuestion.and.callFake(function(cbSucces, cbFail) {
            cbSucces({
                quizId: 101,
                quizCategory: 'TestCategory',
                quizText: 'Test quiz text',
                quizAnswer: 'Test quiz answer',
                quizAnswerByChar: ['T', 'e', 's', 't', ' ', 'q', 'u', 'i', 'z', ' ', 'a', 'n', 's', 'w', 'e', 'r']
            });
        });

    });

    it('should increase count answer', function() {

        setUpModel(storeServiceMock);

        model.incrementCountAnswer(testCallbackMock);

        expect(storeServiceMock.saveByKey).toHaveBeenCalledWith('countAnswer', 101, testCallbackMock);
    });

    it('should increase count answer and call callback function', function() {

        setUpModel(new app.StoreService(storageEngineMock));

        model.incrementCountAnswer(testCallbackMock);

        expect(testCallbackMock).toHaveBeenCalledWith({
            countAnswer: 101,
            countQuestion: 100
        });
    });



    it('should increase count question', function() {
        var expectedCountQuestion = 1;

        setUpModel(storeServiceMock);

        model.incrementCountQuestion(testCallbackMock);

        expect(storeServiceMock.saveByKey).toHaveBeenCalledWith('countQuestion', 101, testCallbackMock);
    });

    it('should increase count question and call callback function', function() {

        setUpModel(new app.StoreService(storageEngineMock));

        model.incrementCountQuestion(testCallbackMock);

        expect(testCallbackMock).toHaveBeenCalledWith({
            countAnswer: 100,
            countQuestion: 101
        });
    });

    it('should read count question', function() {
        setUpModel(storeServiceMock);

        model.readCountQuestion(testCallbackMock);

        expect(storeServiceMock.readByKey).toHaveBeenCalledWith('countQuestion', testCallbackMock);
    });

    it('should read count question and call callback function', function() {
        setUpModel(new app.StoreService(storageEngineMock));

        model.readCountQuestion(testCallbackMock);

        expect(testCallbackMock).toHaveBeenCalledWith({
            countQuestion: 100,
        });
    });

    it('should read count answer', function() {
        setUpModel(storeServiceMock);

        model.readCountAnswer(testCallbackMock);

        expect(storeServiceMock.readByKey).toHaveBeenCalledWith('countAnswer', testCallbackMock);
    });

    it('should read count answer and call callback function', function() {
        setUpModel(new app.StoreService(storageEngineMock));

        model.readCountAnswer(testCallbackMock);

        expect(testCallbackMock).toHaveBeenCalledWith({
            countAnswer: 100,
        });
    });

    it('should get next question and call success callback function', function() {
        setUpModel(storeServiceMock);

        var cbSuccessSpy = jasmine.createSpy('cbSucces');
        var cbFailSpy = jasmine.createSpy('cbFail');

        model.getQuestion(cbSuccessSpy, cbFailSpy);

        expect(cbSuccessSpy).toHaveBeenCalledWith({
            quizId: 101,
            quizCategory: 'TestCategory',
            quizText: 'Test quiz text',
            quizAnswer: 'Test quiz answer',
            quizAnswerByChar: ['T', 'e', 's', 't', ' ', 'q', 'u', 'i', 'z', ' ', 'a', 'n', 's', 'w', 'e', 'r']
        });
        expect(cbFailSpy).not.toHaveBeenCalled();
    });

    it('should get next quiestion and call fail callback function', function() {
        var failStoreServiceMock = jasmine.createSpyObj('failStoreServiceMock', ['getQuestion']);
        failStoreServiceMock.getQuestion.and.callFake(function(cbSucces, cbFail) {
            cbFail();
        });

        var cbSuccessSpy = jasmine.createSpy('cbSucces');
        var cbFailSpy = jasmine.createSpy('cbFail');


        setUpModel(failStoreServiceMock);

        model.getQuestion(cbSuccessSpy, cbFailSpy);

        expect(cbSuccessSpy).not.toHaveBeenCalled();
        expect(cbFailSpy).toHaveBeenCalled();
    });

});