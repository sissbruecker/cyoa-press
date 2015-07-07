/**
 * Created by Sascha on 07.07.15.
 */
var fs = require('fs');

module.exports = function loadTemplate(name) {
    try {
        return fs.readFileSync('templates/' + name + '.hbs').toString();
    } catch (e) {
    }
};