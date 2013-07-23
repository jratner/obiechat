define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/userAccount'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function(options) {
        },

        render: function() {
            $(this.el).html(template({user: this.model}));
        }
    });
});
