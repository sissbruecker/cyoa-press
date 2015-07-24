/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');
var renderTemplate = require('./renderers/render-template');
var loadTemplate = require('./renderers/load-template');

var template = loadTemplate('complete');

var config = require('./config');

module.exports = function binder(index, reader) {

    var title = extractTitle(index);
    var content = index.reduce(function(content, part) {
        return content + reader(part);
    }, '');

    var params = {
        title: title,
        content: content
    };

    var markup = renderTemplate(template, params);

    fs.writeFileSync(path.join(config.outDir, 'complete.html'), markup);
};

function extractTitle(index) {

    var titles = index.filter(function(part) {
        return part.type == 'title'
    });

    return titles.length ? titles[0].name : '';
}