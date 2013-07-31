define(['oc', 'socketio'], function(oc, io) {
    oc.Modules.socketModule = function() {
        var socket;
        return {
            initialize: function() {
                socket = io.connect("http://www.obiechat.com");
                socket.on('error', function(error) {
                    console.log('Error from server: ', error);
                });
                return socket;
            }
        };
    };
    return oc.Modules.socketModule;
});
