define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/userAccount'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            var user = {};
            if (this.model.id) {
                user = this.model.templateReady();
            }
            $(this.el).html(template(user));
        }
    });
});
