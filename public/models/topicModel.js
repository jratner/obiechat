define(['oc', 'underscore', 'backbone', 'collections/postCollection'], function(oc, _,Backbone, PostCollection) {
    oc.Models.TopicModel =  Backbone.Model.extend({
        getPostsAndWatch: function() {
            this.posts = new PostCollection(this.id);
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
