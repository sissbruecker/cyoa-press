/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');
var renderTemplate = require('./renderers/render-template');
var loadTemplate = require('./renderers/load-template');
var partFileChecker = require('./util/part-file-checker');
var partFileReader = require('./util/part-file-reader');

var template = loadTemplate('complete');

module.exports = function binder(context, callback) {

    var index = context.index;
    var outDir = context.outDir;
    var checker = partFileChecker(context.outRenderedDir);
    var reader = partFileReader(context.outRenderedDir);

    var title = extractTitle(index);
    var content = index.reduce(function(content, part) {
        if(!checker(part)) return content;
        return content + reader(part);
    }, '');

    var params = {
        title: title,
        content: content
    };

    var markup = renderTemplate(template, params);

    fs.writeFileSync(path.join(outDir, 'complete.html'), markup);

    callback.call();
};

function extractTitle(index) {

    var titles = index.filter(function(part) {
        return part.type == 'title'
    });

    return titles.length ? titles[0].name : '';
}