(function(window) {
    'use strict';

    function StoreService(storageEngine) {
        this._storageEngine = storageEngine;
    }

    StoreService.prototype.saveByKey = function(updateKey, updateData, callback) {
        var data = this._storageEngine.read();
        data[updateKey] = updateData;

        this._storageEngine.save(data);

        callback = callback || function() {};
        callback.call(this, data);
    };

    StoreService.prototype.readAll = function(callback) {
        callback = callback || function() {};
        callback.call(this, this._storageEngine.read());
    };

    StoreService.prototype.readByKey = function(key, callback) {

        var data = this._storageEngine.read();

        var result = {};
        result[key] = data[key];

        callback = callback || function() {};
        callback.call(this, result);

        return result;
    };

    StoreService.prototype.getQuestion = function(cbSuccess, cbFail) {

        var request = $.getJSON("http://jservice.io/api/random");

        request.done(function(data) {
            var result = {};
            var triviaQuiz = data.shift();

            result.quizId = triviaQuiz.id;
            result.quizText = triviaQuiz.question;
            result.quizCategory = triviaQuiz.category.title;
            // clean up  the answer from atrifacts
            result.quizAnswer = triviaQuiz.answer.replace(/<i>|<\/i>|(|)|\\|\//g, '');

            cbSuccess = cbSuccess || function() {};
            cbSuccess.call(this, result);

        });

        request.fail(function() {
            cbFail();
        });

    };

    // export to window
    window.app = window.app || {};
    window.app.StoreService = StoreService;

})(window);