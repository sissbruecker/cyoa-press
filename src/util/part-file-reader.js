/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

var namer = require('./part-file-namer');
var partFileChecker = require('./part-file-checker');

module.exports = function reader(basePath) {

    var checker = partFileChecker(basePath);

    return function (part) {

        if(!checker(part)) return null;

        var fileName = namer(part);
        var filePath = path.join(basePath, fileName);

        return fs.readFileSync(filePath).toString();
    }
};