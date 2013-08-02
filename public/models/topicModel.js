define(['oc', 'underscore', 'backbone', 'collections/messageCollection'], function(oc, _,Backbone, MessageCollection) {
    oc.Models.TopicModel =  Backbone.Model.extend({
        getMessagesAndWatch: function() {
            this.messages = new MessageCollection(this.id);
        },
        previewTemplateReady: function() {
            return {
                name: this.get('name'),
                type: this.get('type')
            };
        },
        templateReady: function() {
            return {
                name: this.get('name'),
                type: this.get('type'),
                owner: this.get('owner')
            };
        }
    });
    return oc.Models.TopicModel;
});
