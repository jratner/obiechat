define(['oc', 'jquery', 'underscore', 'backbone', 'views/notificationCenterView','hbs!templates/layout'],
function(oc, $, _, Backbone, NotificationCenterView,template) {
    return Backbone.View.extend({
        el: $('#layout'),
        events: {
        },
        
        initialize: function(options) {
            this.notificationCenterView = new NotificationCenterView();
        },
        render: function() {
            $(this.el).html(template());
            this.notificationCenterView.render();
        }
    });
});
