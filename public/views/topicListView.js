define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/topicList'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function(options) {
        },

        render: function() {
            $(this.el).html(template({topics: this.collection}));
        }
    });
});
