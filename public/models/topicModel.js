define(['oc', 'backbone'], function(oc, Backbone) {
    oc.Models.TopicModel =  Backbone.Model.extend({
        initialize: function() {
            if(this.id) {
                this.getMessages();
            }
        },
        getMessages: function() {
            this.messages = new oc.Collections.MessageCollection(this.id);
        }
    });
    return oc.Models.TopicModel;
});
