(function(window) {
    'use strict';

    function StorageEngine(name) {
        this._dbName = name;
    }

    StorageEngine.prototype.read = function() {
        if (!localStorage[name]) {
            localStorage[name] = JSON.stringify({});
        }
        return JSON.parse(localStorage[this._dbName]);
    };
    StorageEngine.prototype.save = function(data) {
        localStorage[this._dbName] = JSON.stringify(data);
    };

    // export to window
    window.app = window.app || {};
    window.app.StorageEngine = StorageEngine;

})(window);