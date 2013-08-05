define(['oc', 'underscore', 'backbone'], function(oc, _,Backbone) {
    oc.Models.PostModel =  Backbone.Model.extend({
        templateReady: function() {
            var ret = {};
            _.each(this.attributes, function(value, key) {
                ret[key] = value;
            });
            ret.post = true;
            return ret;
        }
    });
    return oc.Models.PostModel;
});
