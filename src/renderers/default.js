/**
 * Created by Sascha on 07.07.15.
 */
var render = require('./render-template');
var loadTemplate = require('./load-template');
var forEach = Array.prototype.forEach;

module.exports = function (index, part, content) {

    var template = loadTemplate(part.type);

    if (!template) {
        console.log('Skipping part ' + part.id + ' - template ' + part.type + 'does not exist');
        return;
    }

    console.log('Render part ' + part.id + ' with template ' + part.type);

    var params = {
        index: index,
        content: content
    };

    // Just throw everything defined on part into params and hope it doesn't overwrite something
    Object.keys(part).forEach(function (key) {
        params[key] = part[key];
    });

    return render(template, params);
};
