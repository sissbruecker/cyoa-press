/**
 * Created by Sascha on 05.07.15.
 */
var fs = require('fs');

module.exports = function readIndex(path) {

    var lines = fs.readFileSync(path).toString().split('\n');

    var index = lines.map(toChapter);
    index = index.filter(notNull);

    return index;
};

function toChapter(line, index) {

    if (!line || line.length == 0) return;

    var parts = line.split('|');
    var type = extractPart(parts, 0);
    var name = extractPart(parts, 1);
    var url = extractPart(parts, 2);

    if (url) url = decodeURI(url);

    return {
        index: index + 1,
        type: determineType(type, name, url),
        heading: determineHeading(type, name, url),
        name: name,
        url: url
    }
}

function determineType(type, name, url) {

    if (type == 'title') return 'title';
    if (type == 'author') return 'author';
    if (type == 'index') return 'index';
    if (url && url.length) return 'content';

    return 'heading';
}

function determineHeading(type, name, url) {

    if (type == 'title') return null;
    if (type == 'author') return null;
    if (type == 'index') return null;

    return type;
}

function extractPart(parts, index) {

    if (index > parts.length - 1) return null;

    var part = parts[index];

    return part.trim();
}

function notNull(item) {
    return item != null;
}