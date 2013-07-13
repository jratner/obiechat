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
                //oc.Views.mainView = new MainView();
                //oc.Views.mainView.render();
                oc.socket = oc.socketModule.initialize();
                oc.socket.on('init', function(res) {
                    console.log(res.data);
                });
                callback();
            });
        }
    };
});
