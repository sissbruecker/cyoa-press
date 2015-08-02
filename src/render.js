/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

var defaultRenderer = require('./renderers/default');

var partFileReader = require('./util/part-file-reader');
var partFileWriter = require('./util/part-file-writer');

module.exports = function renderer(context, callback) {

    var index = context.index;
    var reader = partFileReader(context.outRawDir);
    var writer = partFileWriter(context.outRenderedDir);

    console.log('Rendering ' + index.length + ' parts...');

    index.forEach(function (part) {

        var renderer = getRenderer(part);
        var content = reader(part);

        var markup = renderer(index, part, content);

        writer(part, markup);
    });

    console.log('Finished rendering');

    callback.call();
};

function getRenderer(part) {

    var filePath = 'renderers/' + part.type;

    if(fs.existsSync(filePath)) {
        return require(filePath);
    }

    return defaultRenderer;
}