define(['oc', 'jquery', 'backbone', 'hbs!templates/main'], function(oc, $, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function(options) {
            this.el = $('#main');
        },

        render: function() {
            console.log(this.el);
            $(this.el).html(template({info: "poop"}));
        },

        openTopic: function(e) {
            // open view for clicked topic
        }
    });
});
