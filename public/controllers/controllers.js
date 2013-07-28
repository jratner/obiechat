define(['oc', 'jquery', 'backbone', 'controllers/userController', 'controllers/ocController'], function(oc, $, Backbone, UserController, OcController) {
    return {
        userController: new UserController(),
        ocController: new OcController()
    };
});
