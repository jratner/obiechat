define(['oc', 'underscore', 'backbone'], function(oc, _,Backbone) {
    oc.Models.PostModel =  Backbone.Model.extend({
        templateReady: function() {
            var ret = {};
            _.each(this.attributes, function(value, key) {
                ret[key] = value;
            });
            ret.post = true;
            return ret;
        },
        saveNew: function() {
            oc.socket.emit('topic:newPost', {post: this});
        }
    });
    return oc.Models.PostModel;
});
