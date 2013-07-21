define(['oc', 'jquery', 'backbone', 'handlebars', 'mainTemplate'], function(oc, $, Backbone, Handlebars, template) {
    return Backbone.Views.extend({
        el: $('#main'),
        
        events: {
        },
        
        initialize: function(options) {
            this.Template = oc.Templates.Main;
        },

        render: function() {
            $(this.el).html(this.Template());
        },

        openTopic: function(e) {
            // open view for clicked topic
        }
    });
});
