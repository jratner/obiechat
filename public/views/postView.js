define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/post'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
            'submit form': 'postMessage'
        },
        postMessage: function(e) {
            e.preventDefault();
            var body = this.$('input[name=body]').val();
            console.log('post: ', body);
        },
        render: function() {
            $(this.el).html(template());
        },
        close: function() {
            this.remove();
        }
    });
});
