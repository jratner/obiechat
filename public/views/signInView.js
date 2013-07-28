define(['oc', 'jquery', 'underscore', 'backbone', 'hbs!templates/signIn'],
function(oc, $, _, Backbone, template) {
    return Backbone.View.extend({
        events: {
            'submit form': 'userSignInEvent'
        },
        
        initialize: function() {
        },

        render: function() {
            console.log('in render');
            $(this.el).html(template());
        },
        
        userSignInEvent: function(e) {
            e.preventDefault();
            console.log(e);
            oc.socket.emit('user:create', { data: {
                email: $('input[name=email]').val(),
                password: $('input[name=password]').val()
            }});
            oc.socket.on('user:created', function(response) {
                console.log('user created: ', response.user);
            });
        }
    });
});
