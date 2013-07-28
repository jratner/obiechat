define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/userAccount'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
        },
        
        initialize: function() {
        },

        render: function() {
            $(this.el).html(template({user: this.model}));
        },

        signinEvent: function(e) {
            console.log('in here');
            //Backbone.history.navigate('signin', true);
        }
    });
});
