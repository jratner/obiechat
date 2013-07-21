require.config({
    paths: {
        jquery: 'bower_components/jquery/jquery',
        underscore: "bower_components/underscore/underscore",
        socketio: 'bower_components/socket.io-client/dist/socket.io',
        backbone: "bower_components/backbone/backbone",
        ioSync: "bower_components/backbone.iobind/dist/backbone.iosync",
        ioBind: "bower_components/backbone.iobind/dist/backbone.iobind",
        "hbs": "bower_components/require-handlebars-plugin/hbs",
        "Handlebars": "bower_components/require-handlebars-plugin/Handlebars",
        "hbs/underscore": "bower_components/underscore/underscore",
        "hbs/json2": "bower_components/require-handlebars-plugin/hbs/json2"
    },
    shim: {
        'socketio': {
            exports: 'io'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define('oc', function(){
    return window;
});

require(['app', 'backbone', 'jquery'], function(app, Backbone, $){
    app.initialize(function(){
        Backbone.history.start({pushState:true});
    });
});
