define(['oc', 'jquery', 'underscore', 'backbone', 'views/notificationView', 'hbs!templates/notificationCenter'],
function(oc, $, _, Backbone, NotificationView,template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function() {
            this.notifications = [];
        },
        render: function() {
            var self = this;
            $(this.el).html(template());
            oc.socket.on('error', function(data) {
                var notificationView = new NotificationView({data: data, el: $('.notificationsHolder')});
                notificationView.render();
                self.notifications.push(notificationView);
            });
        }
    });
});

