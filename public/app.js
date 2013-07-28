define(['oc', 'backbone', 'jquery'], function(oc, Backbone, $) {
    oc.Views = {};
    oc.Models = {};
    oc.Collections = {};
    oc.Controllers = {};
    oc.Modules = {};

    oc.Views.setContentView = function(View) {
        if (oc.Views.contentView) {
            oc.Views.contentView.remove();
            // this is kind of a hack, i'd rather have #content not get removed
            // each time we swap the view in content...
            $('#main').append('<div id="content"></div>');
        }
        oc.Views.contentView = new View({el: $('#content')});
    };

    return {
        initialize: function(callback) {
            require(['views/mainView', 'modules/socketModule', 'controllers/controllers'], function(MainView, SocketModule, controllers) {
                oc.socketModule = new SocketModule();
                oc.socket = oc.socketModule.initialize();
                oc.Views.mainView = new MainView();
                oc.Views.mainView.render();
                oc.Controllers = controllers;
                callback();
            });
        }
    };
});
