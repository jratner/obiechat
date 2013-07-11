define(['oc', 'io'], function(oc, io) {
    return {
        initialize: function() {
            var socket = oc.socket = io.connect("http://localhost:3000");
        }
    };
});
