define(['oc', 'socketio'], function(oc, io) {
    oc.Modules.socketModule = function() {
        var socket;
        return {
            initialize: function() {
                socket = io.connect("http://www.obiechat.com/");
                return socket;
            }
        };
    };
    return oc.Modules.socketModule;
});
