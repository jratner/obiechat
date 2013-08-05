define(['oc', 'backbone', 'jquery'], function(oc, Backbone, $) {
    oc.Views = {};
    oc.Models = {};
    oc.Collections = {};
    oc.Controllers = {};
    oc.Modules = {};


    return {
        initialize: function(callback) {
            require(['views/mainView', 'modules/socketModule', 'models/userModel', 'controllers/controllers'], function(MainView, SocketModule, UserModel, controllers) {
                oc.socketModule = new SocketModule();
                oc.socket = oc.socketModule.initialize();
                oc.currentUser = new UserModel();
                oc.currentUser.setCurrentUser();
                oc.Views.mainView = new MainView();
                oc.Views.mainView.render();
                oc.Controllers = controllers;
                callback();
            });
        }
    };
});
