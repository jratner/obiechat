define(['oc', 'jquery', 'backbone', 'controllers/userController'], function(oc, $, Backbone, UserController) {
    return {
        userController: new UserController()
    };
});
