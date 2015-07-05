/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');
var replaceParam = require('./util').replaceParam;

var template = fs.readFileSync(path.join('templates', 'complete.html')).toString();

module.exports = function binder(index, reader, outPath) {

    var title = extractTitle(index);
    var chaptersContent = '';

    index.forEach(function (chapter) {
        chaptersContent += reader(chapter);
    });

    template = replaceParam(template, 'title', title);
    template = replaceParam(template, 'chapters-content', chaptersContent);

    fs.writeFileSync(path.join(outPath, 'complete.html'), template);
};

function extractTitle(index) {

    var titles = index.filter(function(chapter) {
        return chapter.type == 'title'
    });

    return titles.length ? titles[0].name : '';
}