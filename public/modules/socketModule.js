define(['oc', 'socketio'], function(oc, io) {

    var domain = "localhost";
    var port = ":3000";
    oc.Modules.socketModule = function() {
        var socket;
        return {
            initialize: function() {
                socket = io.connect("http://" + domain + port);
                return socket;
            }
        };
    };
    return oc.Modules.socketModule;
});
