define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/layout'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        el: $('#layout'),
        events: {
        },
        
        initialize: function(options) {
        },

        render: function() {
            $(this.el).html(template());
        }
    });
});
