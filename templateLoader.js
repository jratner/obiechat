var fs = require('fs');
var handlebars = require('handlebars');
var _ = require('underscore');

module.exports = function() {
    var templates = {};
    
    var templateFiles = fs.readdirSync('./templates');
    _.without(templateFiles, '.gitignore', '.DS_Store');
    _.each(templateFiles, function(templateFile, index) {
        var tempName = templateFile.substring(0, templateFile.length - 11);
        templates[tempName] = handlebars;
    });
    return templates;
};
