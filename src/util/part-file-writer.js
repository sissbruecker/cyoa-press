/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

var namer = require('./part-file-namer');

module.exports = function writer(basePath) {

    return function(part, content) {

        var fileName = namer(part);
        var filePath = path.join(basePath, fileName);

        fs.writeFileSync(filePath, content);
    }
};