define(['oc', 'backbone', 'jquery'], function(oc, Backbone, $) {
    oc.Views = {};
    oc.Models = {};
    oc.Collections = {};
    oc.Controllers = {};
    oc.Modules = {};

    return {
        initialize: function(callback) {
            require(['views/mainView', 'modules/socketModule'], function(MainView, SocketModule) {
                oc.socketModule = new SocketModule();
                oc.socket = oc.socketModule.initialize();
                oc.Views.mainView = new MainView();
                oc.Views.mainView.render();
                callback();
            });
        }
    };
});
