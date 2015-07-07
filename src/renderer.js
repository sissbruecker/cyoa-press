/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');

var defaultRenderer = require('./renderers/default');

module.exports = function renderer(index, reader, writer) {

    console.log('Rendering ' + index.length + ' parts...');

    index.forEach(function (part) {

        var renderer = getRenderer(part);
        var content = getContent(part, reader);

        var markup = renderer(index, part, content);

        writer(part, markup);
    });

    console.log('Finished rendering');
};

function getRenderer(part) {

    // TODO: Check file exists
    try {
        return require('./renderers/' + part.type);
    } catch (e) {
    }

    return defaultRenderer;
}

function getContent(part, reader) {

    // TODO: Check file exists
    try {
        return reader(part);
    } catch (e) {
    }

    return null;
}