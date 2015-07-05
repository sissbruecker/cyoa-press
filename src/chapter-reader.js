/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

module.exports = function reader(namer, basePath) {
    return function (chapter) {
        var fileName = namer(chapter);
        var filePath = path.join(basePath, fileName);

        return fs.readFileSync(filePath).toString();
    }
};