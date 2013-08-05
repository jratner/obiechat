define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/postCreate'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
            'submit form': 'sendPost'
        },
        sendPost: function(e) {
            e.preventDefault();
            var body = this.$('input[name=body]').val();
            console.log(body);
        },
        render: function() {
            $(this.el).html(template());
        },
        close: function() {
            this.remove();
        }
    });
});
