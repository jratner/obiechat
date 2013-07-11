require.config({
    paths: {
        jquery: 'bower_components/jquery/jquery.js',
        underscore: "bower_components/backbone.iobind/dist/backbone.iobind.js",
        io: 'bower_components/socket.io-client/lib/socket.io-client.js',
        handlebars: "bower_components/handlebars.js/lib/handlebars.js",
        backbone: "bower_components/backbone/backbone.js",
        ioSync: "bower_components/backbone.iobind/dist/backbone.iosync.js",
        ioBind: "bower_components/backbone.iobind/dist/backbone.iobind.js"
    },
    shim: {
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
    console.log('in main');
    app.initialize(function(){
        Backbone.history.start({pushState:true});
    });
});
