define(['oc', 'underscore', 'backbone'], function(oc, _, Backbone) {
    oc.Models.UserModel =  Backbone.Model.extend({
        setCurrentUser: function() {
            var self = this;
            oc.socket.on('currentUser', function(response) {
                console.log('updating currentuser');
                self.set(response.user);
            });
        },
        templateReady: function() {
            var ret = {};
            _.each(this.attributes, function(value, key) {
                ret[key] = value;
            });
            ret.user = true;
            return ret;
        }
    });
    return oc.Models.UserModel;
});
