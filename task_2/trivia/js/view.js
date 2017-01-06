(function(window) {
    'use strict';

    function View() {
        this.countQuestion = $('.count-question');
        this.countAnswer = $('.count-answer');

        this.quizId = $('.quiz-id');
        this.quizCategory = $('.quiz-category');
        this.quizText = $('.quiz-question');


        this.btnSkipQuiz = $('.button-skip-quiz');
        this.btnNextQuiz = $('.button-next-quiz');
    }

    View.prototype.render = function(command, param) {
        var self = this;
        var viewCommands = {
            showCountAnswer: function() {
                self.countAnswer.text('Correct answers:' + param);
            },

            showCountQuestion: function() {
                self.countQuestion.text('Total Questions:' + param);
            },
            showQuestion: function() {
                self.quizId.text('Question ID : ' + param.quizId);
                self.quizCategory.text('Question Category : ' + param.quizCategory);
                self.quizText.text(param.quizText);
            },
        };
        viewCommands[command]();
    };

    View.prototype.bind = function(event, handler) {
        var self = this;
        if (event === 'nextQuiz') {
            self.btnNextQuiz.click(function() {
                handler(self.countQuestion.text());
            });
        } else if (event === 'skipQuiz') {
            self.btnSkipQuiz.click(function() {
                handler(self.countAnswer.text())
            });
        }

    };

    // export to window
    window.app = window.app || {};
    window.app.View = View;
})(window);