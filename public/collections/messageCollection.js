define(['oc', 'backbone', 'models/messageModel'], function(oc, Backbone, MessageModel) {
    oc.Collections.MessageCollection =  Backbone.Collection.extend({
        model: MessageModel,
        initialize: function(topicId) {
            var self = this;
            oc.socket.emit('getAndWatchTopicMessages', {topicId: topicId, user: oc.currentUser});
            oc.socket.on(topicId+'messages', function(response) {
                self.set(response.messages);
                self.trigger('received');
            });
        }
    });
    return oc.Collections.MessageCollection;
});
