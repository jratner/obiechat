// basically made from code found here:
// http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/

filenames = ['message'];

module.exports = function() {
    return {
        
        // Hash of preloaded templates for the app
        templates: {},

        names: filenames,
        
        // Recursively pre-load all the templates for the app.
        // This implementation should be changed in a production environment:
        // All the template files should be concatenated in a single file.
        loadTemplates: function(callback) {
            
            var that = this;
            
            var loadTemplate = function(index) {
                var name = names[index];
                console.log('Loading template: ' + name);
                $.get(name + '.handlebars', function(data) {
                    that.templates[name] = data;
                    index++;
                    if (index < names.length) {
                        loadTemplate(index);
                    } else {
                        callback();
                    }
                });
            };
            
            loadTemplate(0);
        },
        
        // Get template by name from hash of preloaded templates
        get: function(name) {
            return this.templates[name];
        }
    };
});
