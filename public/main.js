require.config({
    paths: {
        jquery: 'bower_components/jquery/jquery',
        underscore: "bower_components/underscore/underscore",
        socketio: 'bower_components/socket.io-client/dist/socket.io',
        backbone: "bower_components/backbone/backbone",
        ioSync: "bower_components/backbone.iobind/dist/backbone.iosync",
        ioBind: "bower_components/backbone.iobind/dist/backbone.iobind",
        handlebars: "bower_components/require-handlebars-plugin/Handlebars",
        json2: "bower_components/require-handlebars-plugin/hbs/json2",
        hbs: "bower_components/require-handlebars-plugin/hbs",
        i18nprecompile: "bower_components/require-handlebars-plugin/hbs/i18nprecompile"
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
        },
        'hbs': {
            deps: ['underscore', 'json2', 'i18nprecompile', 'handlebars'],
            exports: 'hbs'
        }
    },
    
    hbs: {
        templateExtension: "hbs",
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well. (internationalization stuff we probs don't need) 
        disableI18n : true
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
