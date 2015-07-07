/**
 * Created by Sascha on 07.07.15.
 */
var handlebars = require('handlebars');

// TODO: Cache compiled templates
module.exports = function renderTemplate(template, params) {

    return handlebars.compile(template)(params);
};