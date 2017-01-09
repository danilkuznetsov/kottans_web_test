(function(window) {
    'use strict';

    function Model(storeService) {
        this._storeService = storeService;
        this._answer = '';
    }

    Model.prototype.incrementCountAnswer = function(callback) {
        var objCountQuestion = this._storeService.readByKey('countAnswer');
        var count = objCountQuestion.countAnswer;
        count++;
        this._storeService.saveByKey('countAnswer', count, callback);
    };

    Model.prototype.incrementCountQuestion = function(callback) {
        var objCountQuestion = this._storeService.readByKey('countQuestion');
        var count = objCountQuestion.countQuestion;
        count++;
        this._storeService.saveByKey('countQuestion', count, callback);
    };

    Model.prototype.readCountQuestion = function(callback) {
        this._storeService.readByKey('countQuestion', callback);
    };

    Model.prototype.readCountAnswer = function(callback) {
        this._storeService.readByKey('countAnswer', callback);
    };

    Model.prototype.getQuestion = function(cbSuccess, cbFail) {
        var self = this;
        self._storeService.getQuestion(function(result) {
            self._answer = result.quizAnswer;
            result.quizAnswerByChar = result.quizAnswer.split('');
            cbSuccess.call(this, result);
        }, cbFail);
    };

    // export to window
    window.app = window.app || {};
    window.app.Model = Model;
})(window);