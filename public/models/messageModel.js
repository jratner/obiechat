define(['oc', 'underscore', 'backbone'], function(oc, _,Backbone) {
    oc.Models.MessageModel =  Backbone.Model.extend({
        templateReady: function() {
            var ret = {};
            _.each(this.attributes, function(value, key) {
                ret[key] = value;
            });
            ret.message = true;
            return ret;
        }
    });
    return oc.Models.MessageModel;
});
