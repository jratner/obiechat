define(['oc', 'backbone', 'models/postModel'], function(oc, Backbone, PostModel) {
    oc.Collections.PostCollection =  Backbone.Collection.extend({
        model: PostModel,
        initialize: function(topicId) {
            var self = this;
            oc.socket.emit('getAndWatchTopicPosts', {topicId: topicId, user: oc.currentUser});
            oc.socket.on('modifyTopic'+topicId, function(response) {
                self.set(response.topic.posts);
                self.trigger('received');
            });
        }
    });
    return oc.Collections.PostCollection;
});
