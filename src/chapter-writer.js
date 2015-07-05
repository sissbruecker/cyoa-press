/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

module.exports = function writer(namer, basePath) {
    return function(chapter, content) {
        var fileName = namer(chapter);
        var filePath = path.join(basePath, fileName);

        fs.writeFileSync(filePath, content);
    }
};