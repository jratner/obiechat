define(['oc', 'backbone'], function(oc, Backbone) {
    oc.Controllers.userController = Backbone.Router.extend({
        routes: {
            "signin": "signin"
        },

        signin: function() {
            require(['views/signInView'], function(SignInView) {
                oc.Views.setContentView(SignInView);
                oc.Views.contentView.render();
            });
        }
    });
    return oc.Controllers.userController;
});
