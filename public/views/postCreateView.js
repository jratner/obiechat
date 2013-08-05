define(['oc', 'jquery', 'underscore', 'backbone', 'models/postModel','hbs!templates/postCreate'],
function(oc, $, _, Backbone, PostModel,template) {
    return Backbone.View.extend({
        events: {
            'submit form': 'sendPost'
        },
        initialize: function(options) {
            this.topicId = options.topicId;
        },
        sendPost: function(e) {
            e.preventDefault();
            var input = this.$('input[name=body]');
            var post = new PostModel({body: input.val(), user: oc.currentUser, topicId: this.topicId});
            post.saveNew();
            input.val("");
        },
        render: function() {
            $(this.el).html(template());
        },
        close: function() {
            this.remove();
        }
    });
});
