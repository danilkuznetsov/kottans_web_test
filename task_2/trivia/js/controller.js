(function(window) {
    'use strict';

    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

    }

    //export to window
    window.app = window.app || {};
    window.app.Controller = Controller;

})(window);