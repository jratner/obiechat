define(['oc', 'backbone', 'models/topicModel'], function(oc, Backbone, TopicModel) {
    oc.Collections.TopicCollection =  Backbone.Collection.extend({
        model: TopicModel,
        getMainTopics: function() {
            var self = this;
            oc.socket.emit('topics:getMain', {page: 1});
            oc.socket.on('topics:main', function(response) {
                self.set(response.topics);
                self.trigger('received');
            });
        }
    });
    return oc.Collections.TopicCollection;
});
