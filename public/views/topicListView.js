define(['oc', 'jquery', 'underscore', 'backbone', 'views/topicPreviewView','views/topicView', 'hbs!templates/topicList'],
function(oc, $, _, Backbone, TopicPreviewView, TopicView, template) {
    return Backbone.View.extend({
        events: {
        },
        initialize: function() {
            var self = this;
            this.topicPreviews = {};
            this.topicView = '';
            if (this.collection.get('topics') && this.collection.get('topics').length) {
                this.setTopic(this.collection.models[0]);                
            } else {
                this.listenToOnce(this.collection, 'received', function() {
                    console.log('received topics');
                    self.setTopic(self.collection.models[0]);
                });
            }
        },
        setTopic: function(topic) {
            if (this.topic == topic) {
                return;
            }
            this.topic = topic;
            if (this.topic) {
                this.renderTopic();
            }
        },
        renderTopic: function() {
            if (this.topicView) {
                this.topicView.close();
            }
            this.topicView = new TopicView({model: this.topic, el: $('.topicViewHolder')});
            this.topicView.render();
        },
        renderPreviews: function() {
            var self = this;
            this.$('.topicPreviews').empty();
            // need to clean up old preview views somehow
            _.each(this.collection.models, function(topic) {
                var previewView = self.topicPreviews[topic.get('id')] = new TopicPreviewView({model: topic, el: $('.topicPreviews')});
                previewView.render();
            });            
        },
        render: function() {
            $(this.el).html(template());
            this.renderPreviews();
            if (this.topic) {
                this.renderTopic();
            }
            this.listenTo(this.collection, 'received', this.renderPreviews);
        }
    });
});
