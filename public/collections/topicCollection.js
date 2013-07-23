define(['oc', 'backbone'], function(oc, Backbone) {
    oc.Collections.TopicCollection =  Backbone.Collection.extend({
        getMainTopics: function() {
            var self = this;
            oc.socket.emit('topics:getMain', {page: 1});
            oc.socket.on('topics:main', function(topics) {
                self.set(topics);
            });
        }
    });
    return oc.Collections.TopicCollection;
});
