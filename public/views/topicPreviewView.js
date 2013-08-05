define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/topicPreview'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        render: function() {
            $(this.el).append(template(this.model.previewTemplateReady()));
        },
        close: function() {
            
        }
    });
});
