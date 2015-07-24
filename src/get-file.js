/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

var config = require('./config');

module.exports = function getFile(part, callback) {

    try {
        var filePath = path.join(config.bookDir, part.path);
        var fileContent = fs.readFileSync(filePath).toString();

        callback.call(null, fileContent);

    } catch (e) {
        console.log('Error: Could not read file content from: ' + filePath);
        callback.call(null, null);
    }
};