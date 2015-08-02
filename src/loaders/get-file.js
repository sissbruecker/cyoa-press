/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

module.exports = function getFile(context, part, callback) {

    var filePath = path.join(context.bookDir, part.path);

    try {
        var fileContent = fs.readFileSync(filePath).toString();

        callback.call(null, fileContent);

    } catch (e) {
        console.log('Error: Could not read file content from: ' + filePath);
        callback.call(null, null);
    }
};