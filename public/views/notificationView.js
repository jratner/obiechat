define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/notification'],
function(oc, $, _, Backbone,template) {
    return Backbone.View.extend({
        events: {
            'click .notification': 'close'
        },
        
        initialize: function(options) {
            this.data = options.data;
        },
        render: function() {
            $(this.el).prepend(template(this.data));
        },
        close: function() {
            this.remove();
        }
    });
});
