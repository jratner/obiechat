define(['oc', 'jquery', 'underscore', 'backbone', 'views/messageView', 'views/postView', 'hbs!templates/topic'],
function(oc, $, _, Backbone, MessageView, PostView, template) {
    return Backbone.View.extend({
        events: {
        },
        initialize: function() {
            this.model.getMessagesAndWatch();
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.messages, 'change', this.renderMessages);
            this.messageViews = [];
        },
        renderMessages: function() {
            _.each(this.model.get('messages'), function(message) {
                var messageView = new MessageView({model: message, el: $('.messageArea')});
                this.messageViews.push(messageView);
                messageView.render();
            });
        },
        render: function() {
            $(this.el).html(template(this.model.templateReady()));
            this.renderMessages();
            this.postView = new PostView({el: $(".postArea")});
            this.postView.render();
        },
        close: function() {
            _.each(this.messageViews, function(view) {
                view.close();
            });
            this.postView.close();
            $(this.el).empty();
        }
    });
});
