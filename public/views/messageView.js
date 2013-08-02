define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/message'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            $(this.el).append(template(this.model.templateReady()));
        },
        close: function() {
            this.remove();
        }
    });
});
