(function(window) {
    'use strict';

    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;


        self.view.bind('nextQuiz', function(data) {
            self.nextQuestion();
            self.updateCountQuestion();
        });

        self.view.bind('skipQuiz', function(data) {
            self.nextQuestion();
            self.updateCountQuestion();
        });
    }

    Controller.prototype.updateCountQuestion = function() {
        var self = this;
        self.model.incrementCountQuestion(function(data) {
            self.view.render('showCountQuestion', data.countQuestion);
        });
    };

    Controller.prototype.updateCountAnswer = function() {
        var self = this;
        self.model.incrementCountAnswer(function(data) {
            self.view.render('showCountAnswer', data.countAnswer);
        });
    };

    Controller.prototype.nextQuestion = function() {
        var self = this;
        self.model.getQuestion(function(data) {
            console.log(data.quizAnswer);
            self.view.render('showQuestion', data);
            // self.view.render('showStartAnswerBoard',);
        });
    };


    //export to window
    window.app = window.app || {};
    window.app.Controller = Controller;

})(window);