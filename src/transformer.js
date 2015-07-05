/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');
var path = require('path');
var replaceParam = require('./util').replaceParam;

var titleTemplate = fs.readFileSync(path.join('templates', 'title.html')).toString();
var authorTemplate = fs.readFileSync(path.join('templates', 'author.html')).toString();
var indexTemplate = fs.readFileSync(path.join('templates', 'index.html')).toString();
var indexEntryTemplate = fs.readFileSync(path.join('templates', 'index-entry.html')).toString();
var headingTemplate = fs.readFileSync(path.join('templates', 'heading.html')).toString();
var chapterTemplate = fs.readFileSync(path.join('templates', 'chapter.html')).toString();

module.exports = function transformer(index, reader, writer) {

    console.log('Transforming ' + index.length + ' chapters...');

    index.forEach(function (chapter) {

        switch (chapter.type) {

            case 'title':
                transformTitle(index, chapter, reader, writer);
                break;
            case 'author':
                transformAuthor(index, chapter, reader, writer);
                break;
            case 'index':
                transformIndex(index, chapter, reader, writer);
                break;
            case 'heading':
                transformHeading(index, chapter, reader, writer);
                break;
            case 'content':
                transformContent(index, chapter, reader, writer);
                break;
        }
    });

    console.log('Finished transforming');
};

function transformTitle(index, chapter, reader, writer) {

    console.log('Transforming chapter ' + chapter.index + ' as title');

    var html = titleTemplate;

    html = replaceParam(html, 'chapter-heading', chapter.heading);
    html = replaceParam(html, 'chapter-type', chapter.type);
    html = replaceParam(html, 'chapter-index', chapter.index);
    html = replaceParam(html, 'chapter-name', chapter.name);

    writer(chapter, html);
}

function transformAuthor(index, chapter, reader, writer) {

    console.log('Transforming chapter ' + chapter.index + ' as author');

    var html = authorTemplate;

    html = replaceParam(html, 'chapter-heading', chapter.heading);
    html = replaceParam(html, 'chapter-type', chapter.type);
    html = replaceParam(html, 'chapter-index', chapter.index);
    html = replaceParam(html, 'chapter-name', chapter.name);

    writer(chapter, html);
}

function transformIndex(index, chapter, reader, writer) {

    console.log('Transforming chapter ' + chapter.index + ' as index');

    var html = indexTemplate;
    var indexContent = '';

    index.forEach(function (chapter) {

        if(!(chapter.type == 'heading' || chapter.type == 'content')) return;

        var entry = indexEntryTemplate;
        entry = replaceParam(entry, 'chapter-type', chapter.type);
        entry = replaceParam(entry, 'chapter-index', chapter.index);
        entry = replaceParam(entry, 'chapter-name', chapter.name);
        indexContent += entry;
    });

    html = replaceParam(html, 'index-content', indexContent);

    writer(chapter, html);
}

function transformHeading(index, chapter, reader, writer) {

    console.log('Transforming chapter ' + chapter.index + ' as heading');

    var html = headingTemplate;

    html = replaceParam(html, 'chapter-heading', chapter.heading);
    html = replaceParam(html, 'chapter-type', chapter.type);
    html = replaceParam(html, 'chapter-index', chapter.index);
    html = replaceParam(html, 'chapter-name', chapter.name);

    writer(chapter, html);
}

function transformContent(index, chapter, reader, writer) {

    console.log('Transforming chapter ' + chapter.index + ' as content');

    var content = reader(chapter);
    var html = chapterTemplate;

    html = replaceParam(html, 'chapter-heading', chapter.heading);
    html = replaceParam(html, 'chapter-type', chapter.type);
    html = replaceParam(html, 'chapter-index', chapter.index);
    html = replaceParam(html, 'chapter-name', chapter.name);
    html = replaceParam(html, 'chapter-content', content);

    writer(chapter, html);
}