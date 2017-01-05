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

    // export to window
    window.app = window.app || {};
    window.app.StoreService = StoreService;

})(window);