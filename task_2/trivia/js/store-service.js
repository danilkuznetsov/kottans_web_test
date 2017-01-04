(function(window) {
    'use strict';

    function StoreService(storageEngine, callback) {
        this._storageEngine = storageEngine;
        callback = callback || function() {};
        callback.call(this, this._storageEngine.read());
    }

    StoreService.prototype.save = function(updateKey, updateData, callback) {
        var data = this._storageEngine.read();
        data[updateKey] = updateData;

        this._storageEngine.save(data);

        callback = callback || function() {};
        callback.call(this, data);
    };

    StoreService.prototype.read = function(callback) {
        callback = callback || function() {};
        callback.call(this, this._storageEngine.read());
    };

    // export to window
    window.app = window.app || {};
    window.app.StoreService = StoreService;

})(window);