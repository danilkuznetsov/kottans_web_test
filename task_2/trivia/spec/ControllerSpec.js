describe('controller', function() {
    'use strict';
    var modelMock, viewMock, controller;

    beforeEach(function() {
        modelMock = jasmine.createSpyObj('model', ['incrementCountQuestion', 'incrementCountAnswer', 'readCountQuestion', 'readCountAnswer', 'getQuestion']);
        viewMock = jasmine.createSpyObj('view', ['render', 'bind']);

        modelMock.incrementCountAnswer.and.callFake(function(callback) {
            callback({
                countAnswer: 100,
            });
        });

        modelMock.incrementCountQuestion.and.callFake(function(callback) {
            callback({
                countQuestion: 150
            });
        });


        modelMock.getQuestion.and.callFake(function(callback) {
            callback({
                quizId: 100,
                quizCategory: 'QuizCategory',
                quizText: 'QuizText',
                quizAnswer: 'Test quiz answer',
                quizAnswerByChar: ['T', 'e', 's', 't', ' ', 'q', 'u', 'i', 'z', ' ', 'a', 'n', 's', 'w', 'e', 'r']
            });
        });

        modelMock.readCountQuestion.and.callFake(function(callback) {
            callback({
                countQuestion:150
            });
        });

        modelMock.readCountAnswer.and.callFake(function(callback) {
            callback({
                countAnswer:10
            });
        });

        controller = new app.Controller(modelMock, viewMock);
    });

    it('should update count answer and render result to view', function() {
        controller.updateCountAnswer();
        expect(modelMock.incrementCountAnswer).toHaveBeenCalled();
        expect(viewMock.render).toHaveBeenCalledWith('showCountAnswer', 100);
    });

    it('should update count question and render result to view', function() {
        controller.updateCountQuestion();
        expect(modelMock.incrementCountQuestion).toHaveBeenCalled();
        expect(viewMock.render).toHaveBeenCalledWith('showCountQuestion', 150);
    });

    it('should get next question and render result to view', function() {
        controller.getNextQuestion();
        expect(modelMock.getQuestion).toHaveBeenCalled();

        expect(viewMock.render).toHaveBeenCalledWith('showQuestion', {
            quizId: 100,
            quizCategory: 'QuizCategory',
            quizText: 'QuizText',
            quizAnswer: 'Test quiz answer',
            quizAnswerByChar: ['T', 'e', 's', 't', ' ', 'q', 'u', 'i', 'z', ' ', 'a', 'n', 's', 'w', 'e', 'r']
        });

    });

    it('should create start screen: get next question, get count answer and quiestion  and render result to view', function() {
        controller.loadGame();

        expect(modelMock.readCountQuestion).toHaveBeenCalled();
        expect(modelMock.readCountAnswer).toHaveBeenCalled();
        expect(modelMock.getQuestion).toHaveBeenCalled();

        expect(viewMock.render).toHaveBeenCalledWith('showCountQuestion', 150);
        expect(viewMock.render).toHaveBeenCalledWith('showCountAnswer', 10);
        expect(viewMock.render).toHaveBeenCalledWith('showQuestion', {
            quizId: 100,
            quizCategory: 'QuizCategory',
            quizText: 'QuizText',
            quizAnswer: 'Test quiz answer',
            quizAnswerByChar: ['T', 'e', 's', 't', ' ', 'q', 'u', 'i', 'z', ' ', 'a', 'n', 's', 'w', 'e', 'r']
        });

    });
});