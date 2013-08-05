define(['oc', 'jquery', 'underscore', 'backbone', 'views/postView', 'views/postCreateView', 'hbs!templates/topic'],
function(oc, $, _, Backbone, PostView, PostCreateView, template) {
    return Backbone.View.extend({
        events: {
        },
        initialize: function() {
            this.model.getPostsAndWatch();
            this.collection = this.model.posts;
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.collection, 'received', this.renderPosts);
            this.postViews = [];
        },
        renderPosts: function() {
            var self = this;
            _.each(this.collection.models, function(post) {
                var postView = new PostView({model: post, el: $('.postArea')});
                self.postViews.push(postView);
                postView.render();
            });
        },
        render: function() {
            $(this.el).html(template(this.model.templateReady()));
            this.renderPosts();
            this.replyView = new PostCreateView({el: $(".postReplyArea"), topicId: this.model.id});
            this.replyView.render();
        },
        close: function() {
            _.each(this.postViews, function(view) {
                view.close();
            });
            this.replyView.close();
            $(this.el).empty();
        }
    });
});
